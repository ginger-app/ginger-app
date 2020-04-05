// Core
import React, { useState } from 'react';

// Styles
import Styles from './styles.module.scss';

// Components
import { InputField } from '../../components';

// Instruments
import { AsYouType } from 'libphonenumber-js';

export const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('+380');

    const handlePhoneNumberChange = ({ target: { value } }) => {
        if (!/^[0-9+ ]*$/.test(value)) return null;
        if (value.length < 4 || value.length > 18) return null;

        return setPhoneNumber(new AsYouType('UA').input(value));
    };

    const buttonAction = () => console.log('Click!');

    return (
        <section className={Styles.container}>
            Login route
            <InputField
                title={'Номер телефону'}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                buttonAction={buttonAction}
            />
        </section>
    );
};
