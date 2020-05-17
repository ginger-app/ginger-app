// Core
import React from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Components
import { MarketItem, Carousel } from 'components';

export const ItemsCatalogue = ({ className, categoryName, categorySku, extended, children }) => {
    return (
        <section className={`${Styles.container} ${extended && Styles.extended} ${className}`}>
            {extended && <p className={Styles.title}>{categoryName}</p>}
            <Carousel className={Styles.carousele} itemsToShow={2} itemsToScroll={2} enableAutoPlay>
                {children.map(({ nameUkr, sku, price, unit }, index) => (
                    <MarketItem
                        className={Styles.marketItem}
                        key={index}
                        to={`/products/${sku}`}
                        name={nameUkr}
                        priceFormatted={price.toFixed(2).split('.')}
                        price={price}
                        unit={unit}
                        sku={sku}
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
