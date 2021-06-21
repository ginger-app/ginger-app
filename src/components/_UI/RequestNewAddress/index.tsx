// Core
import React, { FC } from 'react';
import { Transition } from 'react-transition-group';

// Styles

// Instruments
import { Icon } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import Styles from './styles.module.scss';

type RequestNewAddressPropsTypes = {
    inProp: boolean;
    requestedAddress: string;
    setRequestedAddress: (e: string) => void;
    closeModal: () => void;
};

export const RequestNewAddress: FC<RequestNewAddressPropsTypes> = ({
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
                        placeholder='Type in your address'
                        onChange={({ target: { value } }) => setRequestedAddress(value)}
                    />
                    <div className={Styles.requestButton} onClick={() => requestedAddress}>
                        Send request
                    </div>
                </section>
            )}
        </Transition>
    );
};
