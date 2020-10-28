// Core
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';

// Actions
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    favorites: state.profile.get('favorites'),
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {
    addItemToFavoritesAsync: profileActions.addItemToFavoritesAsync,
    addItemToFavorites: profileActions.addItemToFavorites,
    removeItemFromFavorites: profileActions.removeItemFromFavorites,
    removeItemFromFavoritesAsync: profileActions.removeItemFromFavoritesAsync,
};

const FavoritesButtonComponent = ({
    className,
    id,
    favorites,
    isAuthenticated,
    addItemToFavorites,
    addItemToFavoritesAsync,
    removeItemFromFavorites,
    removeItemFromFavoritesAsync,
}) => {
    return (
        <section
            className={`${Styles.container} ${className}`}
            onClick={
                favorites[id]
                    ? (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // if user is already logged in - updateing his favorites
                          if (isAuthenticated) return removeItemFromFavoritesAsync(id);
                          // otherwise - just locally
                          removeItemFromFavorites(id);
                      }
                    : (e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // if user is already logged in - updateing his favorites
                          if (isAuthenticated) return addItemToFavoritesAsync(id);
                          // otherwise - just locally
                          addItemToFavorites(id);
                      }
            }
        >
            <Icon
                name={favorites[id] ? 'heart-filled' : 'heart'}
                color={favorites[id] ? 'red' : 'black'}
            />
        </section>
    );
};

FavoritesButtonComponent.porpTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
};

export const FavoritesButton = connect(
    mapStateToProps,
    mapDispatchToProps,
)(FavoritesButtonComponent);
