// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Components
import { Toaster, Icon } from 'components';

// Instruments
import mock from 'theme/assets/images/apples-mock.png';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    cart: state.profile.get('cart'),
});

const mapDispatchToProps = {
    showCart: uiActions.showCart,
};

const CartToasterComponent = ({ className, cart, showCart }) => {
    const [hidden, setHiddenState] = useState(false);

    return (
        <Toaster
            className={`${Styles.container} ${hidden && Styles.hidden}`}
            inProp={cart.length > 0}
        >
            {/* Wrapping icon in div to give it more "clickable" space */}
            <div className={Styles.leftArrow} onClick={() => setHiddenState(true)}>
                <Icon name='leftArrow' color='white' />
            </div>
            <p className={Styles.title}>Кошик</p>
            <div className={Styles.items}>
                {cart
                    .reverse()
                    .slice(0, 7)
                    .map((item, index) => (
                        <img src={mock} key={index} className={Styles.cartItem} alt='' />
                    ))}
            </div>
            <div
                className={Styles.itemsAmount}
                onClick={hidden ? () => setHiddenState(false) : showCart}
            >
                {cart.length}
            </div>
        </Toaster>
    );
};

export const CartToaster = connect(mapStateToProps, mapDispatchToProps)(CartToasterComponent);
