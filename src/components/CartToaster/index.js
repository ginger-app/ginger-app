// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';

// Styles

// Components
import { Toaster, Icon } from 'components';

// Instruments
import mock from 'theme/assets/images/apples-mock.png';

// Actions
import { uiActions } from 'bus/ui/actions';
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    cart: state.profile.get('cart'),
});

const mapDispatchToProps = {
    showCart: uiActions.showCart,
};

const CartToasterComponent = ({ className, cart, showCart }) => {
    const [hidden, setHiddenState] = useState(false);

    const sum =
        Object.keys(cart).length === 0
            ? 0
            : Object.keys(cart)
                  .map((item) => +cart[item].price * +cart[item].amount)
                  .reduce((a, b) => a + b);
    const discount = 0.05;

    const countContainerTranslateValue = () => {
        const containerWidth = document.getElementsByClassName(Styles.container)[0].clientWidth;
        const sumWidth = document.getElementsByClassName(Styles.sum)[0].clientWidth;

        return `translateX(calc((-95vw - ${containerWidth}px) / 2 + ${sumWidth}px + 0.75rem))`;
    };

    return (
        <Toaster
            className={`${Styles.container} ${className}`}
            containerStyles={
                hidden && {
                    transform: countContainerTranslateValue(),
                }
            }
            inProp={Object.keys(cart).length > 0}
        >
            {/* Wrapping icon in div to give it more "clickable" space */}
            <div className={Styles.leftArrow} onClick={() => setHiddenState(true)}>
                <Icon name='leftArrow' color='white' />
            </div>
            <p className={Styles.title} onClick={showCart}>
                Кошик
            </p>
            <div className={Styles.items} onClick={showCart}>
                {Object.keys(cart)
                    .reverse()
                    .slice(0, 7)
                    .map((item, index) => (
                        <img src={mock} key={index} className={Styles.cartItem} alt='' />
                    ))}
            </div>
            <div className={Styles.sum} onClick={hidden ? () => setHiddenState(false) : showCart}>
                {(sum * (1 - discount)).toFixed(2)}₴
            </div>
        </Toaster>
    );
};

export const CartToaster = connect(mapStateToProps, mapDispatchToProps)(CartToasterComponent);
