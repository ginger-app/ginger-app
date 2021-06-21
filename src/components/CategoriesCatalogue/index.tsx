// Core
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { AppState } from 'bus/init/rootReducer';

// Styles
import Styles from './styles.module.scss';

// Components
import { CategoryItem, Carousel, Link } from 'components';

// Instruments
import { book } from 'core';

// Actions
//

const mapStateToProps = (state: AppState) => ({
    categories: state.market.categories,
});

type CatalogueTypes = ReturnType<typeof mapStateToProps> & {
    className?: string;
    extended?: boolean;
    buttonStyle?: { width: string };
    itemsToShow?: number;
};

const CatalogueComponent: FC<CatalogueTypes> = ({ className, categories, extended }) => {
    const testCats = categories
        .concat(categories)
        .concat(categories)
        .concat(categories)
        .concat(categories)
        .concat(categories)
        .concat(categories)
        .concat(categories)
        .concat(categories)
        .concat(categories)
        .concat(categories)
        .concat(categories)
        .concat(categories)
        .concat(categories);

    /**
     * We want to render columns of 2 categories. For that we have to devide
     * categories array into array of arrays that consist of 2 items.
     */
    const formattedCategories = testCats
        .map((item, index) => {
            if (index % 2 === 0) {
                return [item, testCats[index + 1]];
            }

            return null;
        })
        .filter(Boolean);

    return (
        <section className={`${Styles.container} ${extended && Styles.extended} ${className}`}>
            {/* {extended && <p className={Styles.title}>Catalogue</p>} */}
            <Carousel className={Styles.carousele}>
                {formattedCategories.map(
                    (item, index) =>
                        item && (
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
                        ),
                )}
            </Carousel>
            {extended && (
                <Link
                    className={Styles.actionButtonContainer}
                    to={book.market}
                    text='В маркет'
                    fontWeight='bold'
                    onClick={() => null}
                />
            )}
        </section>
    );
};

export const CategoriesCatalogue = connect(mapStateToProps, {})(CatalogueComponent);
