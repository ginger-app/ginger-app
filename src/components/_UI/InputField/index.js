// Core
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import arrow from 'theme/assets/svg/right-arrow.svg';
import Styles from './styles.module.scss';

// Instruments

export const InputField = ({
    className,
    title,
    placeholder,
    value,
    onChange,
    buttonAction,
    autoFocus,
    disabled,
}) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            {/* <p className={Styles.title}>{title}</p> */}
            <input
                className={Styles.input}
                onChange={({ target }) => onChange(target.value)}
                value={value}
                placeholder={title || placeholder}
                autoFocus={autoFocus}
                disabled={disabled}
            />
            {buttonAction && (
                <div className={Styles.button} onClick={buttonAction}>
                    <img src={arrow} alt='Phone number input' />
                </div>
            )}
        </section>
    );
};

InputField.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    buttonAction: PropTypes.func,
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
};
