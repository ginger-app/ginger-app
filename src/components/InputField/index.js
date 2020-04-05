// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

// Instruments
import arrow from '../../theme/assets/svg/right-arrow.svg';

export const InputField = ({ className, title, value, onChange, buttonAction }) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            <p className={Styles.title}>{title}</p>
            <input className={Styles.input} onChange={onChange} value={value} />
            {buttonAction && (
                <div className={Styles.button} onClick={buttonAction}>
                    <img src={arrow} alt='Phone number input' />
                </div>
            )}
        </section>
    );
};
