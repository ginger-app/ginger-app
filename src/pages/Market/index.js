// Core
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { Icon, CategoriesCatalogue, ItemsCatalogue } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core/routes';

// Actions
import { marketActions } from 'bus/market/actions';

const mapStateToProps = (state) => ({
    categories: state.market.get('categories').toJS(),
});

const mapDispatchToProps = {
    getMarketCategoriesAsync: marketActions.getMarketCategoriesAsync,
};

const MarketComponent = ({ className, getMarketCategoriesAsync, categories }) => {
    useEffect(() => {
        getMarketCategoriesAsync();
    }, [getMarketCategoriesAsync]);

    const fruitsAndVegetablesCategory = categories.filter(({ name }) => name === 'does')[0];

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={`${Styles.container} ${className}`}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    {/* Header section */}
                    <NavLink className={Styles.homeButton} to={book.home}>
                        <Icon name='home' />
                    </NavLink>
                    <p className={Styles.title}>Market</p>

                    {/* Main section */}
                    <CategoriesCatalogue className={Styles.categories} />
                    <ItemsCatalogue
                        className={Styles.categoryItemsCarousel}
                        categoryName={'Fruits and Vegetables'}
                        categorySku={fruitsAndVegetablesCategory?.sku}
                        extended
                    >
                        {fruitsAndVegetablesCategory?.items || []}
                    </ItemsCatalogue>
                </section>
            )}
        </Transition>
    );
};

export const MarketPage = connect(mapStateToProps, mapDispatchToProps)(MarketComponent);
