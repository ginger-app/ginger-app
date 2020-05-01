// Core
import React from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Components
import { MarketItem, Carousel } from 'components';

export const ItemsCatalogue = ({ className, categoryName, extended, children }) => (
    <section className={`${Styles.container} ${extended && Styles.extended} ${className}`}>
        {extended && <p className={Styles.title}>{categoryName}</p>}
        <Carousel className={Styles.carousele} itemsToShow={2} itemsToScroll={2} enableAutoPlay>
            {children.map((item, index) => (
                <MarketItem name={'Item name'} to='/market' />
            ))}
        </Carousel>
        {extended && (
            <NavLink className={Styles.actionButton} to={'/market'} extended>
                Show more
            </NavLink>
        )}
    </section>
);
