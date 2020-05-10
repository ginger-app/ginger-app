// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    cart: state.profile.get('cart'),
});

const mapDispatchToProps = {
    addItemToCartAsync: profileActions.addItemToCartAsync,
};

const MarketItemOverlayComponent = ({
    className,
    setOverlayState,
    style,
    addItemToCartAsync,
    name,
    image,
    price,
    unit,
    sku,
    cart,
}) => {
    // State
    const [amount, setAmount] = useState(cart[sku]?.amount || 1);
    const [inputDisabled, disableInput] = useState(true);

    // Methods
    const handleInput = ({ target: { value } }) => /^[0-9]*$/.test(value) && setAmount(value);

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={`${Styles.container} ${className}`}
                    style={{
                        ...style,
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <Icon
                        name='close'
                        color='black'
                        onClick={() => setOverlayState(false)}
                        className={Styles.closeOverlay}
                    />
                    <div className={Styles.functionalButton} onClick={() => setAmount(amount + 1)}>
                        <Icon name='plus' color='black' />
                    </div>
                    {inputDisabled ? (
                        <div className={Styles.amountDisabled} onClick={() => disableInput(false)}>
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
                    <div
                        className={Styles.functionalButton}
                        onClick={() => setAmount(Math.max(amount - 1, 1))}
                    >
                        <Icon name='minus' color='black' />
                    </div>
                    <div
                        className={Styles.purchaseButton}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addItemToCartAsync({
                                sku,
                                name,
                                amount,
                                image,
                                price,
                                unit,
                            });
                            setOverlayState(false);
                        }}
                    >
                        До кошика
                        <Icon name='cart' color='white' />
                    </div>
                </section>
            )}
        </Transition>
    );
};

export const MarketItemOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MarketItemOverlayComponent);
