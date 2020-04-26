// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Components
import { CategoryItem, Carousel } from 'components';

// Instruments
import { book } from 'core';

const mapStateToProps = (state) => ({
    categories: state.market.get('categories').toJS(),
});

const mapDispatchToProps = {};

const CatalogueComponent = ({ className, categories, extended }) => (
    <section className={`${Styles.container} ${extended && Styles.extended} ${className}`}>
        {extended && <p className={Styles.title}>Catalogue</p>}
        <Carousel className={Styles.carousele} itemsToScroll={1} enableAutoPlay>
            {/* test case */}
            {[...categories, ...categories].map(({ name, sku }, index) => (
                <div className={Styles.carouseleBlock} key={index}>
                    <CategoryItem className={Styles.item} name={name} sku={sku} />
                    <CategoryItem className={Styles.item} name={name} sku={sku} />
                </div>
            ))}
        </Carousel>
        {extended && (
            <NavLink className={Styles.actionButton} to={book.market}>
                Show more
            </NavLink>
        )}
    </section>
);

export const CategoriesCatalogue = connect(mapStateToProps, mapDispatchToProps)(CatalogueComponent);
