// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { debounce } from 'lodash';
import { book } from 'core';
import profile from 'theme/assets/svg/profile.svg';
import heart from 'theme/assets/svg/heart.svg';

// Components
import { DailyBonus, Catalogue } from 'components';

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

    useEffect(() => {
        getMarketCategoriesAsync();
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
                <img src={profile} />
            </NavLink>
            <NavLink
                className={Styles.favoritesButton}
                to={isAuthenticated ? book.profile : book.signin}
            >
                <img src={heart} />
            </NavLink>
            <DailyBonus className={Styles.dailyBonus} />
            <input
                value={searchValue}
                onChange={handleSearch}
                className={Styles.search}
                placeholder={'Search'}
            />
            <Catalogue className={Styles.catalogue} />
        </section>
    );
};

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
