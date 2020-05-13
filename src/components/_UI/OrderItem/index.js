// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { OrderStatusLabel } from 'components';
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
    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <NavLink
                    className={`${Styles.container} className`}
                    style={{
                        ...style,
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                    to={`/orders/${id}`}
                >
                    <OrderStatusLabel status={status} />
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
                </NavLink>
            )}
        </Transition>
    );
};

export const OrderItem = connect(mapStateToProps, mapDispatchToProps)(OrderItemComponent);
