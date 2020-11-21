// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';

export const CartItem = ({
    className,
    name,
    image,
    price,
    quantity,
    unit,
    removeItem,
    orderDetails,
    incrementQty,
    decrementQty,
}) => {
    return orderDetails ? (
        <section className={`${Styles.orderDetailsContainer} ${className}`}>
            <img className={Styles.image} src={image} alt='' />
            <p className={Styles.name}>{name}</p>
            <p className={Styles.unit}>
                {price} грн/{unit}
            </p>
            <div className={Styles.price}>
                <span className={Styles.sum}>{+price * quantity}</span>
                <span>грн.</span>
            </div>
            <div className={Styles.amountContainer}>
                <div className={Styles.amountButton} onClick={decrementQty}>
                    <Icon name='minus' />
                </div>
                <p className={Styles.amount}>{quantity}</p>
                <div className={Styles.amountButton} onClick={incrementQty}>
                    <Icon name='plus' />
                </div>
            </div>
        </section>
    ) : (
        <section className={`${Styles.container} ${className}`}>
            <img className={Styles.image} src={image} alt='' />
            <p className={Styles.name}>{name}</p>
            <p className={Styles.amount}>
                {quantity} {unit}
            </p>
            <p className={Styles.price}>{price.toFixed(2)}</p>
            <Icon name='close' color='white' className={Styles.icon} onClick={removeItem} />
        </section>
    );
};
