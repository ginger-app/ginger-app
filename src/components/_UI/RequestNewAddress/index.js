// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

export const RequestNewAddress = ({
    className,
    inProp,
    requestedAddress,
    setRequestedAddress,
    closeModal,
}) => {
    return (
        <Transition
            in={inProp}
            appear
            mountOnEnter
            unmountOnExit
            timeout={bottomToTopSlideConfig(700).timeout}
        >
            {(state) => (
                <section
                    className={Styles.requestAddressPopup}
                    style={{
                        ...bottomToTopSlideConfig(700).defaultStyles,
                        ...bottomToTopSlideConfig(700).transitionStyles[state],
                    }}
                >
                    <Icon
                        name='close'
                        color='white'
                        onClick={closeModal}
                        className={Styles.closeIcon}
                    />
                    <p className={Styles.requestTitle}>Wanna request a new address?</p>
                    <input
                        autoFocus
                        value={requestedAddress}
                        className={Styles.addressInput}
                        placesholder={'Type in your address'}
                        onChange={({ target: { value } }) => setRequestedAddress(value)}
                    />
                    <div
                        className={Styles.requestButton}
                        onClick={() => {
                            console.log('Sending address request -> ', requestedAddress);
                        }}
                    >
                        Send request
                    </div>
                </section>
            )}
        </Transition>
    );
};
