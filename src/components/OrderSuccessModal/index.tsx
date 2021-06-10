// Core
import React, { FC } from 'react';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { CreateNewOrder, GradientBorder } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import succesIcon from 'theme/assets/svg/payment-success.svg';

type OrderSuccessModalPropsTypes = { className?: string; inProp: boolean };

export const OrderSuccessModal: FC<OrderSuccessModalPropsTypes> = ({ className, inProp }) => {
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

                    <p className={Styles.title}>Замовлення відправлене!</p>
                    <p className={Styles.note}>
                        Очікуйте на підтвердження замовлення від постачальника
                    </p>

                    <CreateNewOrder />

                    <GradientBorder className={Styles.homeButtonContainer}>
                        <NavLink to='/' className={Styles.homeButton}>
                            На головну
                        </NavLink>
                    </GradientBorder>
                </section>
            )}
        </Transition>
    );
};
