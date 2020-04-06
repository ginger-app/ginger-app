// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Components
import { InputField } from '../../components';

// Instruments
import { AsYouType } from 'libphonenumber-js';

// Actions
import { authActions } from '../../bus/auth/actions';

const mapStateToProps = ({ auth }) => ({
    codeConfirmationPage: auth.get('codeConfirmation'),
});

const mapDispatchToProps = {
    getAuthConfirmationCodeAsync: authActions.getAuthConfirmationCodeAsync,
    sendConfirmationCodeAsync: authActions.sendConfirmationCodeAsync,
};

const LoginComponent = ({
    getAuthConfirmationCodeAsync,
    sendConfirmationCodeAsync,
    codeConfirmationPage,
}) => {
    const [phoneNumber, setPhoneNumber] = useState('+380');
    const [smsCode, setSmsCode] = useState('');

    const handlePhoneNumberChange = ({ target: { value } }) => {
        if (!/^[0-9+ ]*$/.test(value)) return null;
        if (value.length < 4 || value.length > 18) return null;

        return setPhoneNumber(new AsYouType('UA').input(value));
    };

    return (
        <section className={Styles.container}>
            {codeConfirmationPage ? 'Code confirmation route' : 'Login route'}
            {codeConfirmationPage ? (
                <InputField
                    title={'Код з СМС'}
                    value={smsCode}
                    onChange={({ target: { value } }) => setSmsCode(value)}
                    buttonAction={() => sendConfirmationCodeAsync({ phoneNumber, code: smsCode })}
                />
            ) : (
                <InputField
                    title={'Номер телефону'}
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    buttonAction={() => getAuthConfirmationCodeAsync(phoneNumber)}
                />
            )}
        </section>
    );
};

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
