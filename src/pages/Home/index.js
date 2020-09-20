// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
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
} from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    orders: state.profile.get('orders'),
    logs: state.ui.get('logs'),
});

const mapDispatchToProps = {
    getMarketCategoriesAsync: marketActions.getMarketCategoriesAsync,
    showLoginOverlay: uiActions.showLoginOverlay,
};

const HomeComponent = ({
    isAuthenticated,
    getMarketCategoriesAsync,
    showLoginOverlay,
    // orders,
    // logs,
}) => {
    const [showToaster, setToasterVisibility] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');

    // fetching categories
    useEffect(() => {
        getMarketCategoriesAsync();
    }, [getMarketCategoriesAsync]);

    // showing toaster message (currently only for 404)
    useEffect(() => {
        const toasterVisibility = window.location.search.substring(1) === '404';
        setToasterMessage('Page not found');
        setToasterVisibility(toasterVisibility);

        setTimeout(() => {
            setToasterVisibility(false);
        }, 5000);
    }, []);

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
                    <CreateNewOrder className={Styles.dailyBonus} unfinishedOrder />
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
                                <NavLink className={Styles.profileButton} to={book.profile}>
                                    <Icon name='profile' color='black' />
                                </NavLink>
                            ) : (
                                <div className={Styles.loginButton} onClick={showLoginOverlay}>
                                    <Icon name='login' color='black' />
                                </div>
                            )
                        }
                        rightButton={
                            isAuthenticated ? (
                                <NavLink className={Styles.favoritesButton} to={book.lists}>
                                    <Icon name='lists' color='black' />
                                </NavLink>
                            ) : (
                                <div className={Styles.favoritesButton} onClick={showLoginOverlay}>
                                    <Icon name='lists' color='black' />
                                </div>
                            )
                        }
                        search
                    />

                    {/* Toasters, popups, modals */}
                    <Portal>
                        <Toaster
                            inProp={showToaster}
                            message={toasterMessage}
                            closeToaster={() => setToasterVisibility(false)}
                        />
                    </Portal>
                </section>
            )}
        </Transition>
    );
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
