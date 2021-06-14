// Core
import React, { ReactElement, FC } from 'react';

// Styles
import Styles from './styles.module.scss';

// Instruments
// import { Button, Icon } from 'components';
import { RoundButton } from 'domains/ui/components';
import person from 'theme/assets/svg/person.svg';
import atSign from 'theme/assets/svg/at-sign.svg';
import phone from 'theme/assets/svg/phone.svg';
import company from 'theme/assets/svg/company.svg';

const images = {
    person,
    atSign,
    phone,
    company,
};

type InputFieldProps = {
    className?: string;
    title?: string;
    placeholder?: string;
    value: string;
    onChange: (e: string) => void;
    buttonAction?: () => void;
    autoFocus?: boolean;
    disabled?: boolean;
    icon?: keyof typeof images;
};

export const InputField: FC<InputFieldProps> = ({
    className,
    title,
    placeholder,
    value,
    onChange,
    buttonAction,
    autoFocus,
    disabled,
    icon,
}): ReactElement => {
    return (
        <section className={`${Styles.container} ${className}`}>
            {/* <p className={Styles.title}>{title}</p> */}
            {icon && <img className={Styles.img} src={images[icon]} alt='' />}
            <input
                className={Styles.input}
                onChange={({ target }) => onChange(target.value)}
                value={value}
                placeholder={title || placeholder}
                autoFocus={autoFocus}
                disabled={disabled}
                style={{
                    gridColumn: buttonAction ? '2' : '2 / 4',
                }}
            />
            {buttonAction && (
                <RoundButton
                    className={Styles.button}
                    onClick={buttonAction}
                    size={window.innerWidth > 700 ? '4rem' : '3rem'}
                    icon='rightArrow'
                    gradient
                />
            )}
        </section>
    );
};
