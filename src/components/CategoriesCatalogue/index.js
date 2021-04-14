// Core
import React from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Components
import { CategoryItem, Carousel, Link } from 'components';

// Instruments
import { book } from 'core';

// Actions
//

const mapStateToProps = (state) => ({
    categories: state.market.categories,
});

const mapDispatchToProps = {};

const CatalogueComponent = ({ className, categories, extended }) => {
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
                            _id={item[0]._id}
                            index={index}
                        />
                        {item[1] && (
                            <CategoryItem
                                className={Styles.item}
                                name={item[1].name}
                                _id={item[1]._id}
                                index={index}
                            />
                        )}
                    </div>
                ))}
            </Carousel>
            {extended && (
                <Link
                    className={Styles.actionButtonContainer}
                    to={book.market}
                    text='В маркет'
                    fontWeight='bold'
                />
            )}
        </section>
    );
};

export const CategoriesCatalogue = connect(mapStateToProps, mapDispatchToProps)(CatalogueComponent);
