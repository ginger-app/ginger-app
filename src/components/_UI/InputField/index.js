// Core
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon } from 'components';

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
                style={{
                    gridColumn: buttonAction ? '1' : '1 / 3',
                }}
            />
            {buttonAction && (
                <Button
                    className={Styles.button}
                    onClick={buttonAction}
                    content={<Icon name='rightArrow' color='white' />}
                    filled
                />
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
