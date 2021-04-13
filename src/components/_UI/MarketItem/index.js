// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon, AddItemToLocation } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { profileActions } from 'bus/profile/profile.actions';

const mapStateToProps = (state) => ({
    favorites: state.profile.favorites,
    isAuthenticated: state.auth.isAuthenticated,
    cart: state.profile.cart,
});

const mapDispatchToProps = {
    addItemToFavoritesAsync: profileActions.addItemToFavoritesAsync,
    addItemToFavorites: profileActions.addItemToFavorites,
    removeItemFromFavorites: profileActions.removeItemFromFavorites,
    removeItemFromFavoritesAsync: profileActions.removeItemFromFavoritesAsync,
};

const MarketItemComponent = ({ className, itemIndex, style, to, name, price, image, unit, id }) => {
    const [locationsPopup, setLocationsPopupState] = useState(false);

    return (
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
                    <img src={image} alt='' className={Styles.itemImage} />
                    <p className={Styles.itemName}>{name}</p>

                    {/* PRICE BLOCK */}
                    {/* Default price (no discount) */}
                    <p className={Styles.unit}>1 {unit}</p>
                    <p className={Styles.price}>
                        від <span>{price.toFixed(2)} ₴</span>
                    </p>

                    <Button
                        className={Styles.button}
                        content={<Icon name='plus' color='white' />}
                        onClick={(e) => {
                            e.preventDefault();
                            setLocationsPopupState(true);
                        }}
                        filled
                    />

                    {/* Overlays */}
                    <AddItemToLocation
                        productId={id}
                        inProp={locationsPopup}
                        hidePopup={(e) => {
                            e.preventDefault();
                            setLocationsPopupState(false);
                        }}
                    />
                </NavLink>
            )}
        </Transition>
    );
};

export const MarketItem = connect(mapStateToProps, mapDispatchToProps)(MarketItemComponent);
