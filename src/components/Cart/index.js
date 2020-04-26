// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import { Icon, CartItem } from 'components';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    cartIsOpened: state.ui.get('cartIsOpened'),
    cart: state.profile.get('cart'),
});

const mapDispatchToProps = {
    hideCart: uiActions.hideCart,
};

const CartComponent = ({ className, cartIsOpened, hideCart, cart }) => {
    return (
        <Portal>
            <Transition
                in={cartIsOpened}
                appear
                mountOnEnter
                unmountOnExit
                timeout={bottomToTopSlideConfig().timeout}
            >
                {(state) => (
                    <section
                        className={`${Styles.container} ${className}`}
                        style={{
                            ...bottomToTopSlideConfig().defaultStyles,
                            ...bottomToTopSlideConfig().transitionStyles[state],
                        }}
                        onClick={hideCart}
                    >
                        <div className={Styles.arrowIcon}>
                            <Icon onClick={hideCart} color='white' name='slideDownArrow' />
                        </div>
                        <p className={Styles.title}>Check your order delivery information below:</p>
                        <p className={Styles.address}>Some address str, 9</p>
                        <div className={Styles.editButton}>
                            <Icon name='edit' color='black' />
                        </div>
                        <p className={Styles.deliveryTime}>Choose your delivery time</p>
                        <div className={Styles.editButton}>
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
                        <p className={Styles.bonusAmount}>-10.25</p>
                        <p className={Styles.totalTitle}>Total:</p>
                        <p className={Styles.totalAmount}>100.50</p>
                        <div className={Styles.button}>Gimme Money</div>
                    </section>
                )}
            </Transition>
        </Portal>
    );
};

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartComponent);
