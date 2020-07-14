// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    cart: state.profile.get('cart'),
    cartIconVisible: state.ui.get('cartIconVisible'),
    cartIsOpened: state.ui.get('cartIsOpened'),
});

const mapDispatchToProps = {
    showCart: uiActions.showCart,
    hideCartIcon: uiActions.hideCartIcon,
};

const CartToasterComponent = ({ cart, showCart, cartIconVisible, cartIsOpened, hideCartIcon }) => {
    const cartLength = Object.keys(cart).length;

    return (
        <Transition
            in={cartLength > 0 && cartIconVisible && !cartIsOpened}
            appear
            timeout={bottomToTopSlideConfig().timeout}
        >
            {(state) => (
                <div
                    className={Styles.container}
                    style={{
                        ...bottomToTopSlideConfig(300, '6rem').defaultStyles,
                        ...bottomToTopSlideConfig(300, '6rem').transitionStyles[state],
                    }}
                    onClick={showCart}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        hideCartIcon();
                    }}
                >
                    <Icon name='cart' color='white' className={Styles.icon} />
                    <div className={Styles.badge}>{cartLength <= 10 ? cartLength : '10+'}</div>
                </div>
            )}
        </Transition>
    );
};

export const CartToaster = connect(mapStateToProps, mapDispatchToProps)(CartToasterComponent);
