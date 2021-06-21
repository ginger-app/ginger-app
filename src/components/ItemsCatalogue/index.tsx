// Core
import React, { FC } from 'react';

// Styles
import Styles from './styles.module.scss';

// Components
import { MarketItem, Carousel, Link } from 'components';
import { MarketItem as MarketItemT } from 'domains/market/types';

type ItemsPropTypes = {
    className: string;
    categoryName: string;
    categorySku: string;
    extended?: boolean;
    items: MarketItemT[];
};

export const ItemsCatalogue: FC<ItemsPropTypes> = ({
    className,
    categoryName,
    categorySku,
    extended,
    items,
}) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            {extended && <p className={Styles.title}>{categoryName}</p>}
            {extended && (
                <Link
                    className={Styles.showMore}
                    to={`/categories/${categorySku}`}
                    text='Дивитись всі'
                    onClick={() => null}
                />
            )}

            <Carousel className={Styles.carousele}>
                {items.map(({ name, _id, minPrice, unit, image }, index) => (
                    <MarketItem
                        className={Styles.item}
                        itemIndex={index}
                        to={`/products/${_id}`}
                        name={name}
                        price={minPrice}
                        unit={unit}
                        id={_id}
                        key={index}
                        image={image}
                    />
                ))}
            </Carousel>
        </section>
    );
};
