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
    amount,
    unit,
    removeItem,
    orderDetails,
    // sku,
}) => {
    return orderDetails ? (
        <section className={`${Styles.orderDetailsContainer} ${className}`}>
            <img className={Styles.image} src={image} alt='' />
            <p className={Styles.name}>{name}</p>
            <p className={Styles.unit}>1 {unit}</p>
            <div className={Styles.price}>
                <span className={Styles.sum}>{price}</span>
                <span>hrn.</span>
            </div>
            <div className={Styles.amountContainer}>
                <div className={Styles.amountButton}>
                    <Icon name='minus' />
                </div>
                <p className={Styles.amount}>{amount}</p>
                <div className={Styles.amountButton}>
                    <Icon name='plus' />
                </div>
            </div>
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
