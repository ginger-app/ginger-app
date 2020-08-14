// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

// Components
import { MarketItem, Carousel, Link } from 'components';

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
        <section className={`${Styles.container} ${className}`}>
            {extended && <p className={Styles.title}>{categoryName}</p>}
            {extended && (
                <Link
                    className={Styles.showMore}
                    to={`/categories/${categorySku}`}
                    text='Дивитись всі'
                />
            )}

            <Carousel className={Styles.carousele}>
                {itemsToShow.map(({ nameUkr, sku, price, unit }, index) => (
                    <MarketItem
                        className={Styles.item}
                        itemIndex={index}
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
        </section>
    );
};
