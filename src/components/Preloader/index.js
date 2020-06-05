// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import logo from 'theme/assets/svg/logo.svg';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const PreloaderComponent = ({ className, inProp }) => {
    return (
        <Transition
            in={inProp}
            appear
            mountOnEnter
            unmountOnExit
            timeout={{
                enter: 0,
                exit: 500,
            }}
        >
            {(state) => (
                <section
                    className={Styles.container}
                    style={{
                        ...opacityTransitionConfig(0).defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <img src={logo} alt='' />
                </section>
            )}
        </Transition>
    );
};

export const Preloader = connect(mapStateToProps, mapDispatchToProps)(PreloaderComponent);
