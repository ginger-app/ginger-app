// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const OrderItemComponent = ({
    className,
    style,
    status,
    id,
    date,
    address,
    deliveryTime,
    priceFormatted,
}) => {
    const classNames = {
        Pending: Styles.pendingStatus,
        'Awaiting collection': Styles.preparingStatus,
        'Awaiting shipment': Styles.preparingStatus,
        Shipping: Styles.preparingStatus,
        Completed: Styles.completedStatus,
        Cancelled: Styles.cancelledStatus,
    };

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
                    className={`${Styles.container} className`}
                    style={{
                        ...style,
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <div className={`${Styles.status} ${classNames[status]}`}>{status}</div>
                    <p className={Styles.orderId}>
                        Замовлення
                        <span>№{id}</span>
                    </p>
                    <p className={Styles.date}>{new Date(date).toLocaleDateString()}</p>
                    <p className={Styles.address}>{address}</p>
                    <p className={Styles.deliveryTime}>{deliveryTime}</p>
                    <p className={Styles.price}>
                        {priceFormatted[0]}
                        <span>.{priceFormatted[1]}₴</span>
                    </p>
                </section>
            )}
        </Transition>
    );
};

export const OrderItem = connect(mapStateToProps, mapDispatchToProps)(OrderItemComponent);
