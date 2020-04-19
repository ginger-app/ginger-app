// Core
import React, { useState } from 'react';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';

export const MarketItemOverlay = ({ className, setOverlayState, style }) => {
    // State
    const [amount, setAmount] = useState(1);
    const [inputDisabled, disableInput] = useState(true);

    // Methods
    const handleInput = ({ target: { value } }) => /^[0-9]*$/.test(value) && setAmount(value);

    return (
        <section className={`${Styles.container} ${className}`} style={style}>
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
            <div className={Styles.purchaseButton}>
                До кошика
                <Icon name='cart' color='white' />
            </div>
        </section>
    );
};
