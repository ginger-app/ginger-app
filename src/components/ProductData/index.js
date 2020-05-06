// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import { Icon } from 'components';
import mockApples from 'theme/assets/images/apples-mock.png';
import { history } from 'bus/init/middleware/core';

// Actions
import { marketActions } from 'bus/market/actions';
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    productData: state.market.get('productData').toJS(),
    favorites: state.profile.get('favorites'),
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {
    addItemToFavoritesAsync: profileActions.addItemToFavoritesAsync,
    addItemToFavorites: profileActions.addItemToFavorites,
    removeItemFromFavorites: profileActions.removeItemFromFavorites,
    removeItemFromFavoritesAsync: profileActions.removeItemFromFavoritesAsync,
};

const ProductDataComponent = ({
    className,
    sku,
    productData,
    favorites,
    addItemToFavoritesAsync,
    addItemToFavorites,
    removeItemFromFavorites,
    removeItemFromFavoritesAsync,
    isAuthenticated,
}) => {
    const { nameUkr, stock, measurementValue: unit, price } = productData;
    const formattedPrice = price.toFixed(2).split('.');

    // State
    const [amount, setAmount] = useState(1);
    const [inputDisabled, disableInput] = useState(true);

    // Methods
    const handleInput = ({ target: { value } }) =>
        /^[0-9]*$/.test(value) && setAmount(Math.min(+value, stock));

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={bottomToTopSlideConfig(700).timeout}
        >
            {(state) => (
                <section
                    className={`${Styles.container} ${className}`}
                    style={{
                        ...bottomToTopSlideConfig(700).defaultStyles,
                        ...bottomToTopSlideConfig(700).transitionStyles[state],
                    }}
                >
                    <div className={Styles.arrowIcon} onClick={history.goBack}>
                        <Icon color='#bbb6b6' name='slideDownArrow' />
                    </div>
                    <img src={mockApples} className={Styles.image} alt='' />
                    <p className={Styles.itemName}>{nameUkr}</p>
                    <p className={Styles.unit}>1 {unit}</p>
                    <div className={Styles.amountContainer}>
                        <span
                            className={Styles.amountButton}
                            onClick={() => setAmount(Math.max(amount - 1, 1))}
                        >
                            <Icon name='minus' color='black' />
                        </span>
                        {inputDisabled ? (
                            <div
                                className={Styles.amountDisabled}
                                onClick={() => disableInput(false)}
                            >
                                {amount}
                            </div>
                        ) : (
                            <input
                                className={Styles.amountInput}
                                onChange={handleInput}
                                value={amount}
                                autoFocus
                            />
                        )}
                        <span
                            className={Styles.amountButton}
                            onClick={() => setAmount(Math.min(amount + 1, stock))}
                        >
                            <Icon name='plus' color='black' />
                        </span>
                    </div>
                    <p className={Styles.price}>
                        {formattedPrice[0]}
                        <span>.{formattedPrice[1]}₴</span>
                    </p>
                    <p className={Styles.descriptionTitle}>Про продукт</p>
                    <p className={Styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div
                        className={Styles.favoritesButton}
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
                    >
                        <Icon name={favorites[sku] ? 'heart-filled' : 'heart'} color='red' />
                    </div>
                    <div className={Styles.buyButton}>
                        Купити <Icon name='cart' color='white' />
                    </div>
                </section>
            )}
        </Transition>
    );
};

export const ProductData = connect(mapStateToProps, mapDispatchToProps)(ProductDataComponent);
