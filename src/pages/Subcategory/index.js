// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { PageTitle, MarketShowcase, Carousel, Icon } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { isEmpty } from 'lodash';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    subcategoryData: state.market.get('subcategoryData').toJS(),
    cart: state.profile.get('cart'),
    sortingOption: state.market.get('sortingOption'),
});

const mapDispatchToProps = {
    getMarketSubcategoryDataAsync: marketActions.getMarketSubcategoryDataAsync,
    clearMarketSubcategoryData: marketActions.clearMarketSubcategoryData,
    showFilters: uiActions.showFilters,
};

const SubcategoryComponent = ({
    className,
    sku,
    getMarketSubcategoryDataAsync,
    clearMarketSubcategoryData,
    subcategoryData,
    showFilters,
    sortingOption,
    cart,
}) => {
    useEffect(() => {
        getMarketSubcategoryDataAsync(sku);

        return clearMarketSubcategoryData;
    }, [sku]);

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
                    <PageTitle
                        className={Styles.title}
                        title={name}
                        // backButtonAction={clearSubcategoryData}
                        rightButton={
                            <div className={Styles.button} onClick={showFilters}>
                                <Icon name='filters' />
                            </div>
                        }
                    />
                    <Carousel
                        className={Styles.tags}
                        itemsToShow={3}
                        items={tags.map((item, index) => (
                            <div className={Styles.tag} key={index}>
                                {item}
                            </div>
                        ))}
                    />
                    <MarketShowcase className={Styles.showcase} items={sortedItems} marketType />
                </section>
            )}
        </Transition>
    );
};

export const SubcategoryPage = connect(mapStateToProps, mapDispatchToProps)(SubcategoryComponent);
