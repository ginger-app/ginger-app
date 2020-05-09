// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import { Icon, CartItem, MapModal, DeliveryTimeModal } from 'components';

// Actions
import { uiActions } from 'bus/ui/actions';
import { marketActions } from 'bus/market/actions';

const mapStateToProps = (state) => ({
    cartIsOpened: state.ui.get('cartIsOpened'),
    cart: state.profile.get('cart'),
});

const mapDispatchToProps = {
    hideCart: uiActions.hideCart,
    createNewOrderAsync: marketActions.createNewOrderAsync,
};

const CartComponent = ({ className, cartIsOpened, hideCart, cart, createNewOrderAsync }) => {
    const [mapOpened, setMapOpenedState] = useState(false);
    const [timeSelector, setTimeSelectorOpenedState] = useState(false);
    const [address, setAddress] = useState('');
    const [addressDetails, setAddressDetails] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [deliveryComment, setDeliveryComment] = useState('');

    const sum = 1000.5;
    const discount = 0.05;

    const actionDisabled = address.length === 0 || cart.length === 0;

    return (
        <Portal>
            <Transition
                in={cartIsOpened}
                // in
                appear
                mountOnEnter
                unmountOnExit
                timeout={bottomToTopSlideConfig().timeout}
            >
                {(state) => (
                    <>
                        <section
                            className={`${Styles.container} ${className}`}
                            style={{
                                ...bottomToTopSlideConfig().defaultStyles,
                                ...bottomToTopSlideConfig().transitionStyles[state],
                            }}
                        >
                            <div className={Styles.arrowIcon} onClick={hideCart}>
                                <Icon color='white' name='slideDownArrow' />
                            </div>
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
                            <p className={Styles.deliveryTime}>Choose your delivery time</p>
                            <div
                                className={Styles.editButton}
                                onClick={() => setTimeSelectorOpenedState(true)}
                            >
                                <Icon name='edit' color='black' />
                            </div>
                            <div className={Styles.itemList}>
                                {cart.map(({ name, price, amount, image, unit }, index) => (
                                    <CartItem
                                        name={name}
                                        price={price}
                                        amount={amount}
                                        image={image}
                                        unit={unit}
                                        key={index}
                                    />
                                ))}
                            </div>
                            <p className={Styles.bonusTitle}>Your bonus:</p>
                            <p className={Styles.bonusAmount}>{(sum * discount).toFixed(2)}</p>
                            <p className={Styles.totalTitle}>Total:</p>
                            <p className={Styles.totalAmount}>
                                {(sum * (1 - discount)).toFixed(2)}
                            </p>
                            <button
                                className={Styles.button}
                                onClick={() =>
                                    createNewOrderAsync({
                                        sum: Number((sum * (1 - discount)).toFixed(2)),
                                        userCart: cart,
                                        address,
                                        addressDetails,
                                        deliveryTime: '10.00',
                                    })
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
                        />
                    </>
                )}
            </Transition>
        </Portal>
    );
};

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartComponent);
