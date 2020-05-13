// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import moment from 'moment';
import { Icon, OrderStatusLabel, CartItem } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import { history } from 'bus/init/middleware/core';

// Actions
import { marketActions } from 'bus/market/actions';
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    orderData: state.market.get('orderData').toJS(),
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {};

const OrderDetailsComponent = ({ className, sku, orderData, isAuthenticated }) => {
    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         history.push('/');
    //     }
    // }, [isAuthenticated]);

    const { date, address, userCart, sum, status } = orderData;

    const sumFormatted = sum.toFixed(2).split('.');

    console.log(sum, '->', sumFormatted);

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
                        <p className={Styles.date}>{date}</p>
                        <p className={Styles.address}>{address}</p>
                        <OrderStatusLabel status={status} className={Styles.statusLabel} />
                        <div className={Styles.cart}>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
                            <p className={Styles.cartItem}>123123123123</p>
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
