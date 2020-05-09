// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const DeliveryTimeModalComponent = ({ className, inProp, closeModal }) => {
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
                    className={`${Styles.container} ${className}`}
                    style={{
                        ...bottomToTopSlideConfig().defaultStyles,
                        ...bottomToTopSlideConfig().transitionStyles[state],
                    }}
                >
                    <div className={Styles.arrowIcon} onClick={closeModal}>
                        <Icon color='white' name='slideDownArrow' />
                    </div>
                    Select available time
                </section>
            )}
        </Transition>
    );
};

export const DeliveryTimeModal = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DeliveryTimeModalComponent);
