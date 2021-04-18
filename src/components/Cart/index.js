// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { cartTransitionConfig } from 'utils/transitionConfig';
import { Icon, CartItem, MapModal, DeliveryTimeModal, OrderSuccessModal } from 'components';

// Actions
import { uiActions } from 'bus/ui/actions';
import { marketActions } from 'bus/market/market.actions';
import { profileActions } from 'bus/profile/profile.actions';

const mapStateToProps = (state) => ({
    cartIsOpened: state.ui.cartIsOpened,
    // cart: state.profile.cart,
    isAuthenticated: state.auth.isAuthenticated,
    orderPlacedSuccesfully: state.ui.orderPlacedSuccesfully,
});

const mapDispatchToProps = {
    hideCart: uiActions.hideCart,
    createNewOrderAsync: marketActions.createNewOrderAsync,
    removeItemFromCartAsync: profileActions.removeItemFromCartAsync,
    showLoginOverlay: uiActions.showLoginOverlay,
};

const CartComponent = ({
    className,
    cartIsOpened,
    orderPlacedSuccesfully,
    hideCart,
    cart = {},
    createNewOrderAsync,
    removeItemFromCartAsync,
    isAuthenticated,
    showLoginOverlay,
}) => {
    const [mapOpened, setMapOpenedState] = useState(false);
    const [timeSelector, setTimeSelectorOpenedState] = useState(false);
    const [address, setAddress] = useState('');
    const [addressDetails, setAddressDetails] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [displayDeliveryTime, setDisplayDeliveryTime] = useState('Choose your delivery time');
    // const [deliveryComment, setDeliveryComment] = useState('');

    const actionDisabled =
        address.length === 0 || Object.keys(cart).length === 0 || deliveryTime === '';

    const discount = 0.05;
    const sum =
        Object.keys(cart).length === 0
            ? 0
            : Object.keys(cart)
                  .map((item) => +cart[item].price * +cart[item].amount)
                  .reduce((a, b) => a + b);

    return (
        <Portal>
            <Transition
                in={cartIsOpened}
                appear
                mountOnEnter
                unmountOnExit
                timeout={cartTransitionConfig().timeout}
            >
                {(state) => (
                    <>
                        <section
                            className={`${Styles.container} ${className}`}
                            style={{
                                ...cartTransitionConfig().defaultStyles,
                                ...cartTransitionConfig().transitionStyles[state],
                            }}
                        >
                            <p className={Styles.title}>
                                Check your order delivery information below:
                            </p>
                            <p className={Styles.address}>
                                {address.length === 0 ? 'Choose your adress' : address}
                            </p>
                            <div
                                className={Styles.editButton}
                                onClick={() => setMapOpenedState(true)}
                            >
                                <Icon name='edit' color='black' />
                            </div>
                            <p className={Styles.deliveryTime}>{displayDeliveryTime}</p>
                            <div
                                className={Styles.editButton}
                                onClick={() => setTimeSelectorOpenedState(true)}
                            >
                                <Icon name='edit' color='black' />
                            </div>
                            <div className={Styles.itemList}>
                                {Object.keys(cart).map((item, index) => {
                                    const { name, price, amount, image, unit, id } = cart[item];
                                    return (
                                        <CartItem
                                            name={name}
                                            price={price}
                                            amount={amount}
                                            image={image}
                                            unit={unit}
                                            key={index}
                                            removeItem={() => removeItemFromCartAsync(id)}
                                        />
                                    );
                                })}
                            </div>
                            <p className={Styles.bonusTitle}>Your bonus:</p>
                            <p className={Styles.bonusAmount}>{(sum * discount).toFixed(2)}</p>
                            <p className={Styles.totalTitle}>Total:</p>
                            <p className={Styles.totalAmount}>
                                {(sum * (1 - discount)).toFixed(2)}
                            </p>
                            <div className={Styles.backButton} onClick={hideCart}>
                                <Icon name='leftArrow' />
                            </div>
                            <button
                                className={Styles.button}
                                onClick={
                                    isAuthenticated
                                        ? () =>
                                              createNewOrderAsync({
                                                  sum: Number((sum * (1 - discount)).toFixed(2)),
                                                  userCart: cart,
                                                  address,
                                                  addressDetails,
                                                  deliveryTime,
                                              })
                                        : showLoginOverlay
                                }
                                disabled={actionDisabled}
                            >
                                Gimme Money
                            </button>
                        </section>

                        <MapModal
                            closeMap={() => setMapOpenedState(false)}
                            inProp={mapOpened}
                            address={address}
                            setAddress={setAddress}
                            addressDetails={addressDetails}
                            setAddressDetails={setAddressDetails}
                        />

                        <DeliveryTimeModal
                            closeModal={() => setTimeSelectorOpenedState(false)}
                            inProp={timeSelector}
                            deliveryTime={deliveryTime}
                            setDeliveryTime={setDeliveryTime}
                            setDisplayDeliveryTime={setDisplayDeliveryTime}
                        />

                        <OrderSuccessModal inProp={orderPlacedSuccesfully} />
                    </>
                )}
            </Transition>
        </Portal>
    );
};

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartComponent);
