// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { topToBottomSlideConfig } from 'utils/transitionConfig';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const OrderFiltersOverlayComponent = ({ className }) => {
    return (
        <Transition in appear mountOnEnter unmountOnExit timeout={topToBottomSlideConfig().timeout}>
            {(state) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...topToBottomSlideConfig().defaultStyles,
                        ...topToBottomSlideConfig().transitionStyles[state],
                    }}
                />
            )}
        </Transition>
    );
};

export const OrderFiltersOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderFiltersOverlayComponent);
