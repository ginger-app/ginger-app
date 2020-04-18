// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

// Components
import { MarketItem } from 'components';

export const MarketShowcase = ({ className, items }) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            <div className={Styles.infoBlock}>Info</div>
            {items.map((item, index) => (
                <MarketItem
                    className={Styles.marketItem}
                    style={{
                        gridRow: `${index + 1} / ${index + 3}`,
                    }}
                    key={index}
                    to={`${window.location.pathname}/${item}`}
                    name={item}
                />
            ))}
        </section>
    );
};
