// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Google Maps Api
import { GoogleApiWrapper } from 'google-maps-react';

const MapComponents = ({ className }) => {
    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={`${Styles.container} ${className}`}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                ></section>
            )}
        </Transition>
    );
};

export const Map = GoogleApiWrapper({
    apiKey: process.env.GOOGLE_MAPS_API_KEY,
})(MapComponents);
