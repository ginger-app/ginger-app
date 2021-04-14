// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
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

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    orders: state.profile.orders,
    role: state.profile.role,
    logs: state.ui.logs,
});

const mapDispatchToProps = {
    getMarketCategoriesAsync: marketActions.getMarketCategoriesAsync,
    showLoginOverlay: uiActions.showLoginOverlay,
};

const HomeComponent = ({
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
                                <div
                                    className={Styles.loginButton}
                                    onClick={() => showLoginOverlay()}
                                >
                                    <Icon name='login' color='black' />
                                </div>
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
                                <Button
                                    filled
                                    className={Styles.cartButton}
                                    content={
                                        <Icon
                                            className={Styles.cartIcon}
                                            name='cart'
                                            color='white'
                                        />
                                    }
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
                            closeToaster={() => setToasterVisibility(false)}
                        />
                    </Portal>
                </section>
            )}
        </Transition>
    );
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
