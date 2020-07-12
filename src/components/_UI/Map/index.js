// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';

// Styles
import { isEmpty } from 'lodash';
import {
    GoogleMap,
    LoadScript,
    Polygon,
    Marker,
    StandaloneSearchBox,
} from '@react-google-maps/api';
import Styles from './styles.module.scss';

// Instruments
import { centerCoords, libraries, options, paths } from './config';

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

        if (lat() > 50.5291635 || lat() < 50.4889755 || lng() > 30.5304211 || lng() < 30.4831379) {
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
                            styles: [
                                {
                                    featureType: 'all',
                                    elementType: 'labels',
                                    stylers: [
                                        {
                                            visibility: 'on',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'all',
                                    elementType: 'labels.text.fill',
                                    stylers: [
                                        {
                                            saturation: 36,
                                        },
                                        {
                                            color: '#000000',
                                        },
                                        {
                                            lightness: 40,
                                        },
                                    ],
                                },
                                {
                                    featureType: 'all',
                                    elementType: 'labels.text.stroke',
                                    stylers: [
                                        {
                                            visibility: 'on',
                                        },
                                        {
                                            color: '#000000',
                                        },
                                        {
                                            lightness: 16,
                                        },
                                    ],
                                },
                                {
                                    featureType: 'all',
                                    elementType: 'labels.icon',
                                    stylers: [
                                        {
                                            visibility: 'off',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'administrative',
                                    elementType: 'geometry.fill',
                                    stylers: [
                                        {
                                            color: '#000000',
                                        },
                                        {
                                            lightness: 20,
                                        },
                                        {
                                            visibility: 'on',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'administrative',
                                    elementType: 'geometry.stroke',
                                    stylers: [
                                        {
                                            color: '#000000',
                                        },
                                        {
                                            lightness: 17,
                                        },
                                        {
                                            weight: 1.2,
                                        },
                                    ],
                                },
                                {
                                    featureType: 'administrative.country',
                                    elementType: 'labels.text.fill',
                                    stylers: [
                                        {
                                            color: '#e5c163',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'administrative.locality',
                                    elementType: 'labels.text.fill',
                                    stylers: [
                                        {
                                            color: '#c4c4c4',
                                        },
                                        {
                                            visibility: 'on',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'administrative.neighborhood',
                                    elementType: 'labels.text.fill',
                                    stylers: [
                                        {
                                            color: '#e5c163',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'landscape',
                                    elementType: 'geometry',
                                    stylers: [
                                        {
                                            color: '#000000',
                                        },
                                        {
                                            lightness: 20,
                                        },
                                        {
                                            visibility: 'on',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'poi',
                                    elementType: 'geometry',
                                    stylers: [
                                        {
                                            color: '#000000',
                                        },
                                        {
                                            lightness: 21,
                                        },
                                        {
                                            visibility: 'on',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'poi.business',
                                    elementType: 'geometry',
                                    stylers: [
                                        {
                                            visibility: 'on',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'road.highway',
                                    elementType: 'geometry.fill',
                                    stylers: [
                                        {
                                            color: '#e5c163',
                                        },
                                        {
                                            lightness: '0',
                                        },
                                        {
                                            visibility: 'on',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'road.highway',
                                    elementType: 'geometry.stroke',
                                    stylers: [
                                        {
                                            visibility: 'off',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'road.highway',
                                    elementType: 'labels.text.fill',
                                    stylers: [
                                        {
                                            color: '#ffffff',
                                        },
                                        {
                                            visibility: 'off',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'road.highway',
                                    elementType: 'labels.text.stroke',
                                    stylers: [
                                        {
                                            color: '#e5c163',
                                        },
                                        {
                                            visibility: 'off',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'road.arterial',
                                    elementType: 'geometry',
                                    stylers: [
                                        {
                                            color: '#000000',
                                        },
                                        {
                                            lightness: 18,
                                        },
                                    ],
                                },
                                {
                                    featureType: 'road.arterial',
                                    elementType: 'geometry.fill',
                                    stylers: [
                                        {
                                            color: '#575757',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'road.arterial',
                                    elementType: 'labels.text.fill',
                                    stylers: [
                                        {
                                            color: '#ffffff',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'road.arterial',
                                    elementType: 'labels.text.stroke',
                                    stylers: [
                                        {
                                            color: '#2c2c2c',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'road.local',
                                    elementType: 'geometry',
                                    stylers: [
                                        {
                                            color: '#000000',
                                        },
                                        {
                                            lightness: 16,
                                        },
                                    ],
                                },
                                {
                                    featureType: 'road.local',
                                    elementType: 'labels.text.fill',
                                    stylers: [
                                        {
                                            color: '#999999',
                                        },
                                    ],
                                },
                                {
                                    featureType: 'transit',
                                    elementType: 'geometry',
                                    stylers: [
                                        {
                                            color: '#000000',
                                        },
                                        {
                                            lightness: 19,
                                        },
                                    ],
                                },
                                {
                                    featureType: 'water',
                                    elementType: 'geometry',
                                    stylers: [
                                        {
                                            color: '#000000',
                                        },
                                        {
                                            lightness: 17,
                                        },
                                    ],
                                },
                            ],
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
