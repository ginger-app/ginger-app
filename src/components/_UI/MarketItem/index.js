// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, MarketItemOverlay } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import heart from 'theme/assets/svg/heart.svg';
import heartFilled from 'theme/assets/svg/heart-filled.svg';
import apples from 'theme/assets/images/apples-mock.png';

// Actions
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    favorites: state.profile.get('favorites'),
    isAuthenticated: state.auth.get('isAuthenticated'),
    cart: state.profile.get('cart'),
});

const mapDispatchToProps = {
    addItemToFavoritesAsync: profileActions.addItemToFavoritesAsync,
    addItemToFavorites: profileActions.addItemToFavorites,
    removeItemFromFavorites: profileActions.removeItemFromFavorites,
    removeItemFromFavoritesAsync: profileActions.removeItemFromFavoritesAsync,
};

const MarketItemComponent = ({
    className,
    style,
    to,
    name,
    price,
    favorites,
    addItemToFavoritesAsync,
    addItemToFavorites,
    removeItemFromFavorites,
    removeItemFromFavoritesAsync,
    isAuthenticated,
    sku,
}) => {
    // State
    const [overlayEnabled, setOverlayState] = useState(false);

    return overlayEnabled ? (
        <MarketItemOverlay
            setOverlayState={setOverlayState}
            style={style}
            className={className}
            name={name}
            image={apples}
            sku={sku}
        />
    ) : (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <NavLink
                    className={`${Styles.container} ${className}`}
                    to={to}
                    style={{
                        ...style,
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <Icon
                        name={favorites[sku] ? 'heart-filled' : 'heart'}
                        color={favorites[sku] ? 'red' : 'black'}
                        className={Styles.heart}
                        onClick={
                            favorites[sku]
                                ? (e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      // if user is already logged in - updateing his favorites
                                      if (isAuthenticated) return removeItemFromFavoritesAsync(sku);
                                      // otherwise - just locally
                                      removeItemFromFavorites(sku);
                                  }
                                : (e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      // if user is already logged in - updateing his favorites
                                      if (isAuthenticated) return addItemToFavoritesAsync(sku);
                                      // otherwise - just locally
                                      addItemToFavorites(sku);
                                  }
                        }
                    />
                    <img src={apples} alt='' className={Styles.itemImage} />
                    <p className={Styles.itemName}>{name}</p>
                    <p className={Styles.price}>
                        {price[0]}
                        <span>.{price[1]}₴</span>
                    </p>
                    <p className={Styles.amount}>1 kg</p>
                    <Icon
                        name='cart'
                        color='black'
                        className={Styles.cart}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOverlayState(true);
                        }}
                    />
                </NavLink>
            )}
        </Transition>
    );
};

export const MarketItem = connect(mapStateToProps, mapDispatchToProps)(MarketItemComponent);
