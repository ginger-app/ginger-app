// Core
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import logo from 'theme/assets/svg/logo.svg';
import Styles from './styles.module.scss';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    ...state,
});

const mapDispatchToProps = {};

type PreloaderPropsTypes = typeof mapDispatchToProps & { inProp: boolean };

const PreloaderComponent: FC<PreloaderPropsTypes> = ({ inProp }) => {
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
