// Core
import React, { useState, FC } from 'react';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { Map, RequestNewAddress } from 'components';

// Instruments
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

type MapPropsTypes = {
    address: string;
    setAddress: string;
    addressDetails: string;
    setAddressDetails: (value: string) => void;
    closeMap: () => void;
    inProp: boolean;
};

export const MapModal: FC<MapPropsTypes> = ({
    address,
    setAddress,
    addressDetails,
    setAddressDetails,
    closeMap,
    inProp,
}) => {
    const [requestPopup, setRequestModalState] = useState(false);
    const [requestedAddress, setRequestedAddress] = useState('');

    return (
        <Transition
            in={inProp}
            appear
            mountOnEnter
            unmountOnExit
            timeout={bottomToTopSlideConfig().timeout}
        >
            {(state) => (
                <section
                    className={`${Styles.container}`}
                    style={{
                        ...bottomToTopSlideConfig().defaultStyles,
                        ...bottomToTopSlideConfig().transitionStyles[state],
                    }}
                >
                    <Map
                        className={Styles.map}
                        address={address}
                        setAddress={setAddress}
                        suggestRequestingNewAddress={() => setRequestModalState(true)}
                        closeAddressSuggestion={() => setRequestModalState(false)}
                    />
                    <p className={Styles.inputTitle}>Address</p>
                    <input
                        value={address}
                        className={Styles.input}
                        placeholder='Choose your address on a map'
                        // onChange={({ target: { value } }) => setAddress(value)}
                        disabled
                    />
                    <p className={Styles.inputTitle}>Additional details</p>
                    <input
                        value={addressDetails}
                        className={Styles.input}
                        placeholder={"Під'їзд, поверх, квартира тощо"}
                        onChange={({ target: { value } }) => setAddressDetails(value)}
                    />
                    <button className={Styles.button} onClick={closeMap}>
                        {address.length === 0 ? 'Close map' : 'Deliver here'}
                    </button>

                    {/* Requesting address popup */}
                    <RequestNewAddress
                        inProp={requestPopup}
                        requestedAddress={requestedAddress}
                        setRequestedAddress={setRequestedAddress}
                        closeModal={() => setRequestModalState(false)}
                    />
                </section>
            )}
        </Transition>
    );
};
