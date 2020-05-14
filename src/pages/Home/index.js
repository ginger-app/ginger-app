// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Portal } from 'react-portal';
import { debounce } from 'lodash';
import { book } from 'core';
import profile from 'theme/assets/svg/profile.svg';
import login from 'theme/assets/svg/login.svg';
import heart from 'theme/assets/svg/heart.svg';

// Components
import { DailyBonus, CategoriesCatalogue, Toaster, LastOrder } from 'components';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
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
            {isAuthenticated ? (
                <NavLink className={Styles.profileButton} to={book.profile}>
                    <img src={profile} alt='profile' />
                </NavLink>
            ) : (
                <div className={Styles.loginButton} onClick={showLoginOverlay}>
                    <img src={login} alt='' />
                </div>
            )}

            <NavLink className={Styles.favoritesButton} to={book.profile}>
                <img src={heart} alt='lists' />
            </NavLink>
            <DailyBonus className={Styles.dailyBonus} />
            <LastOrder className={Styles.lastOrder} />
            <CategoriesCatalogue className={Styles.catalogue} itemsToShow={2} extended />
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
