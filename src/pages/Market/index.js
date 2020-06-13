// Core
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles

// Components
import { Icon, CategoriesCatalogue, ItemsCatalogue, PageTitle } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core/routes';

// Actions
import { marketActions } from 'bus/market/actions';
import Styles from './styles.module.scss';

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
                    {/* Header section */}
                    <PageTitle
                        className={Styles.header}
                        leftButton={
                            <NavLink className={Styles.homeButton} to={book.home}>
                                <Icon name='home' />
                            </NavLink>
                        }
                        title='Market'
                        rightButton='search'
                    />

                    {/* Main section */}
                    <CategoriesCatalogue className={Styles.categories} />
                    {categories.map(({ name, items, sku }, index) => (
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
                </section>
            )}
        </Transition>
    );
};

export const MarketPage = connect(mapStateToProps, mapDispatchToProps)(MarketComponent);
