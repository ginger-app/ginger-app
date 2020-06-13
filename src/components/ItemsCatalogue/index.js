// Core
import React from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import { MarketItem, Carousel } from 'components';
import Styles from './styles.module.scss';

// Components

export const ItemsCatalogue = ({
    className,
    categoryName,
    categorySku,
    extended,
    children,
    items,
}) => {
    const itemsToShow = items || children;

    return (
        <section className={`${Styles.container} ${extended && Styles.extended} ${className}`}>
            {extended && <p className={Styles.title}>{categoryName}</p>}
            <Carousel className={Styles.carousele}>
                {itemsToShow.map(({ nameUkr, sku, price, unit }, index) => (
                    <MarketItem
                        className={Styles.item}
                        to={`/products/${sku}`}
                        name={nameUkr}
                        priceFormatted={price.toFixed(2).split('.')}
                        price={price}
                        unit={unit}
                        sku={sku}
                        key={index}
                    />
                ))}
            </Carousel>
            {extended && (
                <NavLink className={Styles.actionButton} to={`/categories/${categorySku}`}>
                    Show more
                </NavLink>
            )}
        </section>
    );
};
