// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';

// Styles

// Instruments
import { Icon, MarketItemOverlay } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import discountLabel from 'theme/assets/svg/discount.svg';
import apples from 'theme/assets/images/apples-mock.png';

// Actions
import { profileActions } from 'bus/profile/actions';
import Styles from './styles.module.scss';

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
    itemIndex,
    style,
    to,
    name,
    unit,
    price,
    priceFormatted,
    favorites,
    addItemToFavoritesAsync,
    addItemToFavorites,
    removeItemFromFavorites,
    removeItemFromFavoritesAsync,
    isAuthenticated,
    discount,
    xp = 3,
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
            price={price}
            unit={unit}
        />
    ) : (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            // items will appear 1-by-1
            timeout={{ ...opacityTransitionConfig().timeout, enter: itemIndex * 75 + 200 }}
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
                    {discount && (
                        <div className={Styles.discount}>
                            <img src={discountLabel} alt='' />
                            <span>{discount}%</span>
                        </div>
                    )}
                    <p className={Styles.xp}>+{xp} xp</p>
                    <Icon
                        name={favorites[sku] ? 'heart-filled' : 'heart'}
                        color={favorites[sku] ? 'red' : 'black'}
                        className={Styles.heart}
                        onClick={
                            favorites[sku]
                                ? (e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      // if user is already logged in - updating his favorites
                                      if (isAuthenticated) return removeItemFromFavoritesAsync(sku);
                                      // otherwise - just locally
                                      removeItemFromFavorites(sku);
                                  }
                                : (e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      // if user is already logged in - updating his favorites
                                      if (isAuthenticated) return addItemToFavoritesAsync(sku);
                                      // otherwise - just locally
                                      addItemToFavorites(sku);
                                  }
                        }
                    />
                    <img src={apples} alt='' className={Styles.itemImage} />
                    <p className={Styles.itemName}>{name}</p>

                    {/* PRICE BLOCK */}
                    {/* Default price (no discount) */}
                    {!discount && (
                        <p className={Styles.price}>
                            {priceFormatted[0]}
                            <span>.{priceFormatted[1]}₴</span>
                        </p>
                    )}

                    {/* Dsicounted item case */}
                    {discount && (
                        <>
                            <p className={`${Styles.price} ${Styles.oldPrice}`}>
                                {priceFormatted[0]}
                                <span>.{priceFormatted[1]}₴</span>
                            </p>
                            <p className={`${Styles.price} ${Styles.newPrice}`}>
                                {+priceFormatted[0]}
                                <span>.{priceFormatted[1]}₴</span>
                            </p>
                        </>
                    )}

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
