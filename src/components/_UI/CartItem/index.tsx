// Core
import React, { FC } from 'react';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';

type CartItemPropsTypes = {
    className?: string;
    name: string;
    image: string;
    minPrice: number;
    quantity: number;
    unit: string;
    removeItem?: () => void;
    orderDetails: boolean;
    incrementQty: () => void;
    decrementQty: () => void;
};

export const CartItem: FC<CartItemPropsTypes> = ({
    className,
    name,
    image,
    minPrice,
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
                від {minPrice} грн/{unit}
            </p>
            <div className={Styles.amountContainer}>
                <div className={Styles.amountButton} onClick={decrementQty}>
                    <Icon name='minus' />
                </div>
                <p className={Styles.amount}>{quantity}</p>
                <div className={Styles.amountButton} onClick={incrementQty}>
                    <Icon name='plus' className={Styles.plusIcon} />
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
            <Icon name='close' color='white' className={Styles.icon} onClick={removeItem} />
        </section>
    );
};
