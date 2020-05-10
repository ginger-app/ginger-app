// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

// Components
import { Icon } from 'components';

export const CartItem = ({ className, name, image, price, amount, unit, removeItem }) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            <img className={Styles.image} src={image} alt='' />
            <p className={Styles.name}>{name}</p>
            <p className={Styles.amount}>
                {amount} {unit}
            </p>
            <p className={Styles.price}>{price}</p>
            <Icon name='close' color='white' className={Styles.icon} onClick={removeItem} />
        </section>
    );
};
