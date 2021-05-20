// Core
import React, { useState, useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import {
    CreateNewOrder,
    CategoriesCatalogue,
    Toaster,
    NewsBlock,
    Navigation,
    Icon,
    Dummy,
    Button,
} from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core';
import { RoundButton } from 'domains/ui/components';

// Actions
import { marketActions } from 'bus/market/market.actions';
import { uiActions } from 'bus/ui/ui.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    orders: state.profile.orders,
    unfinishedOrder: state.profile.unfinishedOrder,
    role: state.profile.role,
    logs: state.ui.logs,
});

const mapDispatchToProps = {
    getMarketCategoriesAsync: marketActions.getMarketCategoriesAsync,
    showLoginOverlay: uiActions.showLoginOverlay,
};

type HomePropsTypes = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const HomeComponent: FC<HomePropsTypes> = ({
    isAuthenticated,
    getMarketCategoriesAsync,
    showLoginOverlay,
    role,

    // orders,
    // logs,
}) => {
    const history = useHistory();
    const [showToaster, setToasterVisibility] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');

    // fetching categories
    useEffect(() => {
        getMarketCategoriesAsync();
    }, [getMarketCategoriesAsync]);

    // showing toaster message (currently only for 404)
    useEffect(() => {
        // @ts-ignore
        if (history.location.state?.is404) {
            setToasterMessage('Page not found');
            setToasterVisibility(true);
        }
    }, [history.location.state]);

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={{
                ...opacityTransitionConfig().timeout,
                enter: 300,
            }}
        >
            {(state) => (
                <section
                    className={Styles.container}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <NewsBlock className={Styles.lastOrder} />
                    {role === 'client' || !isAuthenticated ? (
                        <CreateNewOrder className={Styles.dailyBonus} />
                    ) : (
                        <Link to={book.supplierOrders} className={Styles.checkOrders}>
                            Нових замовлень: 0
                        </Link>
                    )}
                    <CategoriesCatalogue
                        className={Styles.catalogue}
                        buttonStyle={{ width: '90%' }}
                        itemsToShow={3}
                        extended
                    />
                    <Dummy />

                    {/* Footer navigation */}
                    <Navigation
                        className={Styles.header}
                        leftButton={
                            isAuthenticated ? (
                                <NavLink
                                    className={Styles.profileButton}
                                    to={
                                        role === 'client'
                                            ? book.clientProfile
                                            : book.supplierProfile
                                    }
                                >
                                    <Icon name='profile' color='black' />
                                </NavLink>
                            ) : (
                                <RoundButton
                                    onClick={() => showLoginOverlay()}
                                    size={window.innerWidth > 700 ? '4rem' : '3rem'}
                                    icon='login'
                                />
                            )
                        }
                        rightButton={
                            <NavLink
                                to={book.newOrder}
                                onClick={(e) => {
                                    if (!isAuthenticated) {
                                        e.preventDefault();
                                        showLoginOverlay();
                                    }
                                }}
                            >
                                <RoundButton
                                    onClick={() => {}}
                                    size={window.innerWidth > 700 ? '4rem' : '3rem'}
                                    icon='cart'
                                    gradient
                                />
                            </NavLink>
                        }
                        search
                    />

                    {/* Toasters, popups, modals */}
                    <Portal>
                        <Toaster
                            inProp={showToaster}
                            message={toasterMessage}
                            closeToaster={() => {
                                setToasterVisibility(false);
                                window.history.replaceState({}, document.title);
                            }}
                        />
                    </Portal>
                </section>
            )}
        </Transition>
    );
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
