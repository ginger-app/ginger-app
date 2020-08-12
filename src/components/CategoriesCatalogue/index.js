// Core
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles

// Components
import { CategoryItem, Carousel, Button } from 'components';

// Instruments
import { book } from 'core';

// Actions
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    categories: state.market.get('categories').toJS(),
});

const mapDispatchToProps = {};

const CatalogueComponent = ({ className, buttonStyle, categories, extended }) => {
    /**
     * We want to render columns of 2 categories. For that we have to devide
     * categories array into array of arrays that consist of 2 items.
     */
    const formattedCategories = categories
        .map((item, index) => {
            if (index % 2 === 0) {
                return [item, categories[index + 1]];
            }

            return null;
        })
        .filter((item) => item); // filter will skip null's

    return (
        <section className={`${Styles.container} ${extended && Styles.extended} ${className}`}>
            {extended && <p className={Styles.title}>Catalogue</p>}
            <Carousel className={Styles.carousele}>
                {formattedCategories.map((item, index) => (
                    <div key={index}>
                        <CategoryItem
                            className={Styles.item}
                            name={item[0].name}
                            sku={item[0].sku}
                            index={index}
                        />
                        <CategoryItem
                            className={Styles.item}
                            name={item[1].name}
                            sku={item[1].sku}
                            index={index}
                        />
                    </div>
                ))}
            </Carousel>
            {extended && (
                <Button
                    className={Styles.actionButtonContainer}
                    content={
                        <NavLink
                            className={Styles.actionButton}
                            to={book.market}
                            style={buttonStyle}
                        >
                            В маркет
                        </NavLink>
                    }
                />
            )}
        </section>
    );
};

export const CategoriesCatalogue = connect(mapStateToProps, mapDispatchToProps)(CatalogueComponent);
