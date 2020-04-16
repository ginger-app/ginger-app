// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

export const MarketItem = (props) => {
    const {
        className,
        sku,
        categories,
        subcategories,
        nameUkr,
        nameRu,
        descriptionUkr,
        descriptionRu,
        manufacturer,
        measurementValue,
        stock,
        price,
        discount,
        tags,
    } = props;

    return <section className={`${Styles.container} ${className}`}>{nameUkr}</section>;
};
