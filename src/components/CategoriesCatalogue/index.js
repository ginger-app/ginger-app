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

// Actions
import { Logger } from 'bus/utils';

const mapStateToProps = (state) => ({
    categories: state.market.get('categories').toJS(),
});

const mapDispatchToProps = {
    Logger,
};

const CatalogueComponent = ({
    className,
    buttonStyle,
    categories,
    itemsToShow,
    itemsToScroll,
    extended,
    Logger,
}) => {
    useEffect(() => {
        console.log(
            'First render',
            'CategoriesCatalogue first render',
            `Categories length -> ${categories.length}`,
        );
    }, []);

    useEffect(() => {
        console.log('consective renders');
    });

    /**
     * We want to render columns of 2 categories. For that we have to devide
     * categories array into array of arrays that consist of 2 items.
     */
    const formattedCategories = categories
        .map((item, index) => {
            if (index % 2 === 0) {
                return [item, categories[index + 1]];
            }
        })
        .filter((item) => item); // filter will skip undefined's

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
                <NavLink className={Styles.actionButton} to={book.market} style={buttonStyle}>
                    Show more
                </NavLink>
            )}
        </section>
    );
};

export const CategoriesCatalogue = connect(mapStateToProps, mapDispatchToProps)(CatalogueComponent);
