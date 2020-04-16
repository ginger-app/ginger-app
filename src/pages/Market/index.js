// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { debounce } from 'lodash';
import { book } from '../../core/book';
import profile from '../../theme/assets/svg/profile.svg';
import heart from '../../theme/assets/svg/heart.svg';

// Components
import { PromotionsGrid, Catalogue } from '../../components';

// Actions
import { marketActions } from '../../bus/market/actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {
    getMarketCategoriesAsync: marketActions.getMarketCategoriesAsync,
};

const MarketComponent = ({ className, isAuthenticated, getMarketCategoriesAsync }) => {
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
            {isAuthenticated ? (
                <NavLink className={Styles.profileButton} to={book.profile}>
                    <img src={profile} />
                </NavLink>
            ) : (
                <NavLink className={Styles.signinButton} to={book.signin}>
                    Sign in
                </NavLink>
            )}
            {isAuthenticated && (
                <NavLink className={Styles.favoritesButton} to={book.profile}>
                    <img src={heart} />
                </NavLink>
            )}
            <input
                value={searchValue}
                onChange={handleSearch}
                className={Styles.search}
                placeholder={'Search'}
            />
            <PromotionsGrid className={Styles.promotions} />
            <Catalogue className={Styles.catalogue} />
        </section>
    );
};

export const MarketPage = connect(mapStateToProps, mapDispatchToProps)(MarketComponent);
