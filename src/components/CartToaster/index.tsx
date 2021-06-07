// Core
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    cartIconVisible: state.ui.cartIconVisible,
    cartIsOpened: state.ui.cartIsOpened,
});

const mapDispatchToProps = {
    showCart: uiActions.showCart,
    hideCartIcon: uiActions.hideCartIcon,
};

type CartToasterPropsTypes = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & { cart: Record<string, any> };

const CartToasterComponent: FC<CartToasterPropsTypes> = ({
    cart = {},
    showCart,
    cartIconVisible,
    cartIsOpened,
    hideCartIcon,
}) => {
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
                        ...bottomToTopSlideConfig(300).defaultStyles,
                        ...bottomToTopSlideConfig(300).transitionStyles[state],
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
