// Core
import React from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import { Icon } from 'components';
import Styles from './styles.module.scss';

// Components

export const CartItem = ({
    className,
    name,
    image,
    price,
    amount,
    unit,
    removeItem,
    orderDetails,
    sku,
}) => {
    return orderDetails ? (
        <section className={`${Styles.orderDetailsContainer} ${className}`}>
            <img className={Styles.image} src={image} alt='' />
            <p className={Styles.name}>{name}</p>
            <div className={Styles.price}>
                {price[0]}
                <span>.{price[1]}₴</span>
            </div>
            <p className={Styles.amount}>
                {amount} {unit}
            </p>
            {/* <div className={Styles.button}>
            <Icon
                            name={favorites[sku] ? 'heart-filled' : 'heart'}
                            color={favorites[sku] ? 'red' : 'black'}
                        />
            </div> */}
            <NavLink className={Styles.button} to={`/products/${sku}`}>
                <Icon name='cart' color='black' />
            </NavLink>
        </section>
    ) : (
        <section className={`${Styles.container} ${className}`}>
            <img className={Styles.image} src={image} alt='' />
            <p className={Styles.name}>{name}</p>
            <p className={Styles.amount}>
                {amount} {unit}
            </p>
            <p className={Styles.price}>{price.toFixed(2)}</p>
            <Icon name='close' color='white' className={Styles.icon} onClick={removeItem} />
        </section>
    );
};
