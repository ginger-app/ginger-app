// Core
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';
import mock from 'theme/assets/images/apples-mock.png';

const mapStateToProps = (state) => ({
    orders: state.profile.get('orders'),
});

const mapDispatchToProps = {};

const LastOrderComponent = ({ className, orders }) => {
    const orderData = orders.length > 0 && orders[0];
    const { userCart, date, id } = orderData;

    return (
        <section className={`${Styles.container} ${className}`}>
            {orderData ? (
                <>
                    <p className={Styles.title}>Repeat last order?</p>
                    <p className={Styles.date}>{new Date(date).toLocaleDateString()}</p>
                    <p className={Styles.cartLength}>{Object.keys(userCart).length} items</p>
                    <div className={Styles.itemImages}>
                        {Object.keys(userCart)
                            .slice(0, 7)
                            .map((item, index) => (
                                <img src={mock} key={index} className={Styles.cartItem} alt='' />
                            ))}
                    </div>
                    <NavLink className={Styles.button} to={`/orders/${id}`}>
                        <Icon name='cart' color='white' className={Styles.icon} />
                    </NavLink>
                </>
            ) : (
                <p className={Styles.mock}>Some news shit</p>
            )}
        </section>
    );
};

export const LastOrder = connect(mapStateToProps, mapDispatchToProps)(LastOrderComponent);
