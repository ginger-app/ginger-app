// Core
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
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

const MarketItemComponent = ({ className, itemIndex, style, to, name, priceFormatted }) => {
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
                    <img src={apples} alt='' className={Styles.itemImage} />
                    <p className={Styles.itemName}>
                        {itemIndex % 2 === 0
                            ? 'Яблука Чемпіон дуже смачні і дуже довгигй текст на два рядки'
                            : name}
                    </p>

                    {/* PRICE BLOCK */}
                    {/* Default price (no discount) */}
                    <p className={Styles.unit}>1 kg</p>
                    <p className={Styles.price}>
                        від{' '}
                        <span>
                            {priceFormatted[0]}.{priceFormatted[1]}₴
                        </span>
                    </p>

                    <p className={Styles.sellersAmount}>3 постачальника</p>
                    <Button
                        className={Styles.button}
                        content={
                            <NavLink className={Styles.link} to={to}>
                                <span>Обрати</span>
                            </NavLink>
                        }
                    />
                </NavLink>
            )}
        </Transition>
    );
};

export const MarketItem = connect(mapStateToProps, mapDispatchToProps)(MarketItemComponent);
