// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { isEmpty } from 'lodash';
import { centerCoords, libraries, options, paths } from './config';
import {
    GoogleMap,
    LoadScript,
    Polygon,
    Marker,
    StandaloneSearchBox,
} from '@react-google-maps/api';

const mapStateToProps = (state) => ({
    gmapsKey: state.auth.get('gmapsKey'),
});

const mapDispatchToProps = {};

const MapComponent = ({
    className,
    gmapsKey,
    address,
    setAddress,
    suggestRequestingNewAddress,
    closeAddressSuggestion,
}) => {
    const [loaded, setLoadedState] = useState(false);
    const [searchBox, setSearchBoxRef] = useState(null);
    const [markerCoords, setMarkerCoords] = useState({});

    const _onInitialLoad = () => setLoadedState(true);
    const _onLoad = (ref) => setSearchBoxRef(ref);

    const _handlePolygonClick = async (data) => {
        const lat = data.latLng.lat();
        const lng = data.latLng.lng();

        setMarkerCoords({
            lat,
            lng,
        });

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyARsbWyaDDZFM-lsKMOdf27zGLxDIbJHlg`,
        );

        const result = await response.json();

        const mapped = result.results.map((item) => item.formatted_address);
        setAddress(mapped[0].split(',').slice(0, -2).join(','));
    };

    // handling google search
    const _onPlacesChanged = () => {
        const addresses = searchBox.getPlaces();
        const {
            formatted_address: formattedAddress,
            geometry: {
                location: { lat, lng },
            },
        } = addresses[0];

        if (50.5291635 < lat() || lat() < 50.4889755 || 30.5304211 < lng() || lng() < 30.4831379) {
            return suggestRequestingNewAddress();
        }

        setMarkerCoords({
            lat: lat(),
            lng: lng(),
        });
        setAddress(formattedAddress.split(',').slice(0, -2).join(','));
        closeAddressSuggestion();
    };

    return (
        <section className={`${Styles.container} ${className}`}>
            {gmapsKey.length > 0 && (
                <LoadScript
                    googleMapsApiKey={gmapsKey}
                    libraries={libraries}
                    onLoad={_onInitialLoad}
                >
                    <GoogleMap
                        mapContainerStyle={{
                            width: '100%',
                            height: '100%',
                        }}
                        center={centerCoords}
                        zoom={13.5}
                        onClick={suggestRequestingNewAddress}
                        clickableIcons={false}
                        options={{
                            mapTypeControl: false,
                            streetViewControl: false,
                            fullscreenControl: false,
                        }}
                    >
                        {loaded && (
                            <StandaloneSearchBox
                                onLoad={_onLoad}
                                onPlacesChanged={_onPlacesChanged}
                                bounds={{
                                    east: 30.4831379,
                                    north: 50.5291635,
                                    south: 50.4889755,
                                    west: 30.5304211,
                                }}
                            >
                                <input
                                    placeholder={address.length === 0 ? 'Search...' : address}
                                    className={Styles.input}
                                />
                            </StandaloneSearchBox>
                        )}
                        <Polygon paths={paths} options={options} onClick={_handlePolygonClick} />
                        {!isEmpty(markerCoords) && <Marker position={markerCoords} />}
                        {/* Child components, such as markers, info windows, etc. */}
                    </GoogleMap>
                </LoadScript>
            )}
        </section>
    );
};

export const Map = connect(mapStateToProps, mapDispatchToProps)(MapComponent);
