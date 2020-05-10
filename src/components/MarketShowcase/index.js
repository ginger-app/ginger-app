// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

// Components
import { MarketItem } from 'components';

export const MarketShowcase = ({ className, items }) => {
    // console.log(items);
    return (
        <section className={`${Styles.container} ${className}`}>
            <div className={Styles.infoBlock}>Info</div>
            {items.map(({ nameUkr, sku, price, measurementValue }, index) => (
                <MarketItem
                    className={Styles.marketItem}
                    style={{
                        gridRow: `${index + 1} / ${index + 3}`,
                    }}
                    key={index}
                    to={`products/${sku}`}
                    name={nameUkr}
                    priceFormatted={price.toFixed(2).split('.')}
                    price={price}
                    measurementValue={measurementValue}
                    sku={sku}
                />
            ))}
        </section>
    );
};
