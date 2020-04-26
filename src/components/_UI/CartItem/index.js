// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

export const CartItem = ({ className, name, image, price, amount, unit }) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            <img className={Styles.image} src={image} />
            <p className={Styles.name}>{name}</p>
            <p className={Styles.amount}>
                {amount} {unit}
            </p>
            <p className={Styles.price}>{price}</p>
        </section>
    );
};
