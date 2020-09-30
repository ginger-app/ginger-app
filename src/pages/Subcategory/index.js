// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Components
import { Navigation, MarketShowcase, Carousel } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { isEmpty } from 'lodash';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    subcategoryData: state.market.get('subcategoryData').toJS(),
    sortingOption: state.market.get('sortingOption'),
});

const mapDispatchToProps = {
    getMarketSubcategoryDataAsync: marketActions.getMarketSubcategoryDataAsync,
    clearMarketSubcategoryData: marketActions.clearMarketSubcategoryData,
    showMarketFiltersOverlay: uiActions.showMarketFiltersOverlay,
};

const SubcategoryComponent = ({
    sku,
    getMarketSubcategoryDataAsync,
    clearMarketSubcategoryData,
    subcategoryData,
    showMarketFiltersOverlay,
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
                    {/* Title */}
                    <p className={Styles.title}>{name}</p>

                    {/* Content + filters */}
                    <MarketShowcase className={Styles.showcase} items={sortedItems} marketType />

                    {/* Footer navigation */}
                    <Carousel
                        className={Styles.tags}
                        carouselClassName={Styles.carousele}
                        itemsToShow={3}
                        items={tags.map((item, index) => (
                            <NavLink
                                to={`${window.location.pathname}/${item}`}
                                className={Styles.tag}
                                key={index}
                            >
                                {item}
                            </NavLink>
                        ))}
                    />
                    <Navigation
                        search
                        rightButtonData={{
                            onClick: showMarketFiltersOverlay,
                            icon: 'filters',
                        }}
                    />
                </section>
            )}
        </Transition>
    );
};

export const SubcategoryPage = connect(mapStateToProps, mapDispatchToProps)(SubcategoryComponent);
