// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles

// Components
import { Navigation, MarketShowcase, Carousel, Icon } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { isEmpty } from 'lodash';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    subcategoryData: state.market.get('subcategoryData').toJS(),
    sortingOption: state.market.get('sortingOption'),
});

const mapDispatchToProps = {
    getMarketSubcategoryDataAsync: marketActions.getMarketSubcategoryDataAsync,
    clearMarketSubcategoryData: marketActions.clearMarketSubcategoryData,
    showFilters: uiActions.showFilters,
};

const SubcategoryComponent = ({
    // className,
    sku,
    getMarketSubcategoryDataAsync,
    clearMarketSubcategoryData,
    subcategoryData,
    showFilters,
    sortingOption,
}) => {
    useEffect(() => {
        getMarketSubcategoryDataAsync(sku);

        return clearMarketSubcategoryData;
    }, [sku, getMarketSubcategoryDataAsync, clearMarketSubcategoryData]);

    const { name, tags, items } = subcategoryData;

    const sortedItems =
        sortingOption === 'cheapest'
            ? items.sort((a, b) => a.price - b.price)
            : sortingOption === 'expensive'
            ? items.sort((a, b) => b.price - a.price)
            : items;

    return isEmpty(subcategoryData) ? (
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
                    Loading subcategory...
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
                        className={Styles.tags}
                        carouseleClassName={Styles.carousele}
                        itemsToShow={3}
                        items={tags.map((item, index) => (
                            <div className={Styles.tag} key={index}>
                                {item}
                            </div>
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

export const SubcategoryPage = connect(mapStateToProps, mapDispatchToProps)(SubcategoryComponent);
