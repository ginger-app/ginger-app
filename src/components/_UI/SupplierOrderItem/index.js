// Core
import React from 'react';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { OrderStatusLabel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

export const SupplierOrderItem = ({ className }) => {
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
                    <p className={Styles.date}>{new Date(Date.now()).toDateString()}</p>
                    <OrderStatusLabel className={Styles.orderStatus} status='Completed' />

                    <p className={Styles.subtitle}>Location</p>
                    <p className={Styles.value}>Forma.coffee</p>

                    <p className={[Styles.subtitle, Styles.right].filter(Boolean).join(' ')}>
                        Client
                    </p>
                    <p className={[Styles.value, Styles.right].filter(Boolean).join(' ')}>Forma</p>

                    <p className={Styles.price}>1999.9</p>

                    <div className={Styles.cart}>
                        <div className={Styles.item} />
                        <div className={Styles.item} />
                        <div className={Styles.item} />
                        <div className={Styles.item} />
                    </div>
                </section>
            )}
        </Transition>
    );
};
