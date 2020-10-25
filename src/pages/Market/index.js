// Core
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { Icon, CategoriesCatalogue, ItemsCatalogue, Navigation } from 'components';

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
                    {/* Title */}
                    <p className={Styles.title}>Маркет</p>

                    {/* Content section */}
                    <CategoriesCatalogue className={Styles.categories} />
                    {categories
                        .filter(({ items }) => items.length)
                        .map(({ name, items, sku }, index) => (
                            <ItemsCatalogue
                                key={index}
                                className={Styles.categoryItemsCarousel}
                                categoryName={name}
                                categorySku={sku}
                                items={items}
                                index={index}
                                extended
                            />
                        ))}

                    <Navigation
                        leftButton={
                            <NavLink className={Styles.homeButton} to={book.home}>
                                <Icon name='home' />
                            </NavLink>
                        }
                        title='Market'
                        search
                    />
                </section>
            )}
        </Transition>
    );
};

export const MarketPage = connect(mapStateToProps, mapDispatchToProps)(MarketComponent);
