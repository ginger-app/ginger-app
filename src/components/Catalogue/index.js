// Core
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Components
import { CategoryItem } from 'components';

// Instruments
import Carousel from 'react-elastic-carousel';
import { book } from 'core';

const mapStateToProps = (state) => ({
    categories: state.market.get('categories').toJS(),
});

const mapDispatchToProps = {};

const CatalogueComponent = ({ className, categories }) => (
    <section className={`${Styles.container} ${className}`}>
        <p className={Styles.title}>Catalogue</p>
        <div className={Styles.carousele}>
            <Carousel
                itemsToShow={3}
                itemsToScroll={2}
                showArrows={false}
                pagination={false}
                itemPadding={[0, 10, 0, 10]}
                enableTilt
                enableMouseSwipe
            >
                {categories.map(({ name, sku }, index) => (
                    <div className={Styles.carouseleBlock}>
                        <CategoryItem key={index} className={Styles.item} name={name} sku={sku} />
                        <CategoryItem
                            key={index + '123123'}
                            className={Styles.item}
                            name={name}
                            sku={sku}
                        />
                    </div>
                ))}
            </Carousel>
        </div>
        <NavLink className={Styles.actionButton} to={book.market}>
            Show more
        </NavLink>
    </section>
);

export const Catalogue = connect(mapStateToProps, mapDispatchToProps)(CatalogueComponent);
