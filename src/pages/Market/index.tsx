// Core
import React, { useEffect, FC } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { CategoriesCatalogue, ItemsCatalogue, Navigation, Dummy } from 'components';
import { RoundButton } from 'domains/ui/components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core/routes';

// Actions
import { marketActions } from 'bus/market/market.actions';
import { uiActions } from 'bus/ui/ui.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    categories: state.market.categories,
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    getMarketCategoriesAsync: marketActions.getMarketCategoriesAsync,
    showLoginOverlay: uiActions.showLoginOverlay,
};

type MarketPropTypes = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps &
    Record<'className', string>;

const MarketComponent: FC<MarketPropTypes> = ({
    className,
    getMarketCategoriesAsync,
    categories,
    isAuthenticated,
    showLoginOverlay,
}) => {
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
                        .map(({ name, items, _id }, index) => (
                            <ItemsCatalogue
                                key={index}
                                className={Styles.categoryItemsCarousel}
                                categoryName={name}
                                categorySku={_id}
                                items={items}
                                // index={index}
                                extended
                            />
                        ))}
                    <Dummy />

                    <Navigation
                        leftButton={
                            <NavLink to={book.home}>
                                <RoundButton
                                    onClick={() => {}}
                                    size={window.innerWidth > 700 ? '4rem' : '3rem'}
                                    icon='home'
                                    // className={Styles.cartButton}
                                />
                            </NavLink>
                        }
                        rightButton={
                            <NavLink to={book.newOrder}>
                                <RoundButton
                                    onClick={(e) => {
                                        if (!isAuthenticated) {
                                            e.preventDefault();
                                            showLoginOverlay();
                                        }
                                    }}
                                    size={window.innerWidth > 700 ? '4rem' : '3rem'}
                                    icon='lists'
                                    gradient
                                    // className={Styles.cartButton}
                                />
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
