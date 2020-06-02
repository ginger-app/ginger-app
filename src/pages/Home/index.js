// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';
import { debounce } from 'lodash';
import { book } from 'core';

// Components
import { DailyBonus, CategoriesCatalogue, Toaster, LastOrder, PageTitle } from 'components';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    orders: state.profile.get('orders'),
});

const mapDispatchToProps = {
    getMarketCategoriesAsync: marketActions.getMarketCategoriesAsync,
    showLoginOverlay: uiActions.showLoginOverlay,
};

const HomeComponent = ({
    className,
    isAuthenticated,
    getMarketCategoriesAsync,
    showLoginOverlay,
    orders,
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [showToaster, setToasterVisibility] = useState(false);
    const [toasterMessage, setToasterMessage] = useState('');

    // fetching categories
    useEffect(() => {
        getMarketCategoriesAsync();
    }, [getMarketCategoriesAsync]);

    // showing toaster message (currently only for 404)
    useEffect(() => {
        const showToaster = window.location.search.substring(1) === '404';
        setToasterMessage('Page not found');
        setToasterVisibility(showToaster);

        setTimeout(() => {
            setToasterVisibility(false);
        }, 5000);
    }, []);

    const handleSearch = ({ target: { value } }) => {
        debounce(() => {
            //api call here
        }, 500);

        setSearchValue(value);
    };

    return (
        <section className={`${Styles.container} className`}>
            <PageTitle
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
                        <NavLink className={Styles.favoritesButton} to={book.favorites}>
                            <Icon name='heart' color='black' />
                        </NavLink>
                    ) : (
                        <div className={Styles.favoritesButton} onClick={showLoginOverlay}>
                            <Icon name='heart' color='black' />
                        </div>
                    )
                }
                search
            />
            <LastOrder className={Styles.lastOrder} />
            <DailyBonus className={Styles.dailyBonus} />
            <CategoriesCatalogue
                className={Styles.catalogue}
                buttonStyle={{ width: '90%' }}
                itemsToShow={3}
                extended
            />
            <Portal>
                <Toaster
                    inProp={showToaster}
                    message={toasterMessage}
                    closeToaster={() => setToasterVisibility(false)}
                />
            </Portal>
        </section>
    );
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
