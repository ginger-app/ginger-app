// Core
import React from 'react';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import succesIcon from 'theme/assets/svg/succes-circle.svg';

export const OrderSuccessModal = ({ className, inProp }) => {
    return (
        <Transition
            in={inProp}
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
                >
                    <img src={succesIcon} className={Styles.image} alt='' />
                    <p className={Styles.note}>Замовлення прийняте!</p>
                </section>
            )}
        </Transition>
    );
};
