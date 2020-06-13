// Core
import React from 'react';

// Styles
import arrow from 'theme/assets/svg/right-arrow.svg';
import Styles from './styles.module.scss';

// Instruments

export const InputField = ({ className, title, value, onChange, buttonAction, autoFocus }) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            {/* <p className={Styles.title}>{title}</p> */}
            <input
                className={Styles.input}
                onChange={onChange}
                value={value}
                placeholder={title}
                autoFocus={autoFocus}
            />
            {buttonAction && (
                <div className={Styles.button} onClick={buttonAction}>
                    <img src={arrow} alt='Phone number input' />
                </div>
            )}
        </section>
    );
};
