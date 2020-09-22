// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import logo from 'theme/assets/images/logo.png';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const NewsBlockComponent = ({ className }) => {
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
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <img src={logo} alt='' className={Styles.img} />

                    <p className={Styles.text}>Іноваційне рішення для оптових закупівель</p>
                </section>
            )}
        </Transition>
    );
};

export const NewsBlock = connect(mapStateToProps, mapDispatchToProps)(NewsBlockComponent);
