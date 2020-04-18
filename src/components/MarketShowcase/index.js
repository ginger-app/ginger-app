// Core
import React from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

export const MarketShowcase = ({ className, items }) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            <div className={Styles.infoBlock}>Info</div>
            {items.map((item, index) => (
                <NavLink
                    className={Styles.marketItem}
                    style={{
                        gridRow: `${index + 1} / ${index + 3}`,
                    }}
                    key={index}
                    to={`${window.location.pathname}/${item}`}
                >
                    {item}
                </NavLink>
            ))}
        </section>
    );
};
