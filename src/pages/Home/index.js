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
import heart from 'theme/assets/svg/heart.svg';

// Components
import { DailyBonus, CategoriesCatalogue, Toaster } from 'components';

// Actions
import { marketActions } from 'bus/market/actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {
    getMarketCategoriesAsync: marketActions.getMarketCategoriesAsync,
};

const HomeComponent = ({ className, isAuthenticated, getMarketCategoriesAsync }) => {
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
            <NavLink
                className={Styles.profileButton}
                to={isAuthenticated ? book.profile : book.signin}
            >
                <img src={profile} alt='profile' />
            </NavLink>
            <NavLink
                className={Styles.favoritesButton}
                to={isAuthenticated ? book.profile : book.signin}
            >
                <img src={heart} alt='lists' />
            </NavLink>
            <DailyBonus className={Styles.dailyBonus} />
            <input
                value={searchValue}
                onChange={handleSearch}
                className={Styles.search}
                placeholder={'Search'}
            />
            <CategoriesCatalogue className={Styles.catalogue} extended />
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
