// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Components
import { PageTitle, MarketShowcase, Carousel } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { isEmpty } from 'lodash';

// Actions
import { marketActions } from 'bus/market/actions';

const mapStateToProps = (state) => ({
    categoryData: state.market.get('categoryData').toJS(),
});

const mapDispatchToProps = {
    getMarketCategoryDataAsync: marketActions.getMarketCategoryDataAsync,
};

const CategoryComponent = ({ className, sku, getMarketCategoryDataAsync, categoryData }) => {
    useEffect(() => {
        getMarketCategoryDataAsync(sku);
    }, [getMarketCategoryDataAsync, sku]);

    const { name, subcategories } = categoryData;

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
                    <PageTitle className={Styles.title} title={name} />
                    <Carousel
                        itemsToShow={2}
                        className={Styles.tags}
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
                    <MarketShowcase className={Styles.showcase} items={[]} marketType />
                </section>
            )}
        </Transition>
    );
};

export const CategoryPage = connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
