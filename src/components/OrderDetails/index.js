// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles

// Instruments
import moment from 'moment';
import { Icon, OrderStatusLabel, CartItem } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import { history } from 'bus/init/middleware/core';
import mock from 'theme/assets/images/apples-mock.png';
import Styles from './styles.module.scss';

// Actions

const mapStateToProps = (state) => ({
    orderData: state.market.get('orderData').toJS(),
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {};

const OrderDetailsComponent = ({ className, orderData, isAuthenticated }) => {
    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated]);

    const { date, address, userCart, sum, status } = orderData;

    const sumFormatted = sum.toFixed(2).split('.');

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={bottomToTopSlideConfig(700).timeout}
        >
            {(state) => (
                <>
                    <section
                        className={`${Styles.container} ${className}`}
                        style={{
                            ...bottomToTopSlideConfig(700).defaultStyles,
                            ...bottomToTopSlideConfig(700).transitionStyles[state],
                        }}
                    >
                        <div className={Styles.arrowIcon} onClick={history.goBack}>
                            <Icon color='#bbb6b6' name='slideDownArrow' />
                        </div>
                        <p className={Styles.date}>{moment(date).local().toLocaleString()}</p>
                        <p className={Styles.address}>{address}</p>
                        <OrderStatusLabel status={status} className={Styles.statusLabel} />
                        <div className={Styles.cart}>
                            {Object.keys(userCart).map((item, index) => {
                                const { amount, name, price, unit, sku } = userCart[item];

                                return (
                                    <CartItem
                                        amount={amount}
                                        name={name}
                                        unit={unit}
                                        image={mock}
                                        sku={sku}
                                        price={price.toFixed(2).split('.')}
                                        orderDetails
                                        key={index}
                                    />
                                );
                            })}
                        </div>
                    </section>
                    <div className={Styles.footer}>
                        {sumFormatted[0]}
                        <span>.{sumFormatted[1]}₴</span>
                    </div>
                </>
            )}
        </Transition>
    );
};

export const OrderDetails = connect(mapStateToProps, mapDispatchToProps)(OrderDetailsComponent);
