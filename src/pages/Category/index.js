// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Components
import { Navigation, MarketShowcase, Carousel, Icon } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { isEmpty } from 'lodash';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    categoryData: state.market.get('categoryData').toJS(),
    sortingOption: state.market.get('sortingOption'),
});

const mapDispatchToProps = {
    getMarketCategoryDataAsync: marketActions.getMarketCategoryDataAsync,
    clearMarketCategoryData: marketActions.clearMarketCategoryData,
    showFilters: uiActions.showFilters,
};

const CategoryComponent = ({
    sku,
    getMarketCategoryDataAsync,
    clearMarketCategoryData,
    categoryData,
    showFilters,
    sortingOption,
}) => {
    useEffect(() => {
        getMarketCategoryDataAsync(sku);

        return clearMarketCategoryData;
    }, [sku, getMarketCategoryDataAsync, clearMarketCategoryData]);

    const { name, subcategories, items } = categoryData;

    const sortedItems =
        sortingOption === 'cheapest'
            ? items.sort((a, b) => a.price - b.price)
            : sortingOption === 'expensive'
            ? items.sort((a, b) => b.price - a.price)
            : items;

    return isEmpty(categoryData) ? (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={Styles.loadingContainer}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    Loading...
                </section>
            )}
        </Transition>
    ) : (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={Styles.container}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <Navigation className={Styles.title} title={name} rightButton='search' />
                    <Carousel
                        itemsToShow={2}
                        className={Styles.tags}
                        carouseleClassName={Styles.carousele}
                        items={subcategories.map((item, index) => (
                            <NavLink
                                to={`${window.location.pathname}/${item}`}
                                className={Styles.tag}
                                key={index}
                            >
                                {item}
                            </NavLink>
                        ))}
                    />
                    <div className={Styles.filterButton} onClick={showFilters}>
                        <Icon name='filters' color='black' />
                    </div>
                    <MarketShowcase className={Styles.showcase} items={sortedItems} marketType />
                </section>
            )}
        </Transition>
    );
};

export const CategoryPage = connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
