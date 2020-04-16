// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Components
import { InputField } from 'components';

// Instruments
import { AsYouType } from 'libphonenumber-js';
import { validate as validateEmail } from 'email-validator';

// Actions
import { authActions } from 'bus/auth/actions';

const mapStateToProps = ({ auth }) => ({
    codeConfirmationPage: auth.get('codeConfirmation'),
});

const mapDispatchToProps = {
    getSignupConfirmationCodeAsync: authActions.getSignupConfirmationCodeAsync,
    sendSignupDataAsync: authActions.sendSignupDataAsync,
};

const SignupComponent = ({
    getSignupConfirmationCodeAsync,
    sendSignupDataAsync,
    codeConfirmationPage,
}) => {
    const [smsCode, setSmsCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('+380');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handlePhoneNumberChange = ({ target: { value } }) => {
        if (!/^[0-9+ ]*$/.test(value)) return null;
        if (value.length < 4 || value.length > 17) return null;

        return setPhoneNumber(new AsYouType('UA').input(value));
    };

    const nameValidator = (validationFunc, value) =>
        /^[A-Za-z -]*$/.test(value) ? validationFunc(value) : null;

    return (
        <section className={Styles.container}>
            <p>{codeConfirmationPage ? 'Code confirmation route' : 'Signup route'}</p>
            {codeConfirmationPage ? (
                <InputField
                    title={'Код з СМС'}
                    value={smsCode}
                    onChange={({ target: { value } }) => setSmsCode(value)}
                    buttonAction={() =>
                        sendSignupDataAsync({
                            phoneNumber,
                            code: smsCode,
                            userData: {
                                phoneNumber,
                                firstName,
                                lastName,
                                email,
                            },
                        })
                    }
                />
            ) : (
                <>
                    <InputField
                        title={'Номер телефону'}
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        className={phoneNumber.length === 4 && Styles.unfinishedPhoneNumber}
                    />
                    <InputField
                        title={'Електронна пошта'}
                        value={email}
                        onChange={({ target: { value } }) => setEmail(value)}
                    />
                    <InputField
                        title={"Ім'я"}
                        value={firstName}
                        onChange={({ target: { value } }) => nameValidator(setFirstName, value)}
                    />
                    <InputField
                        title={'Прізвище'}
                        value={lastName}
                        onChange={({ target: { value } }) => nameValidator(setLastName, value)}
                    />
                    <div
                        className={Styles.sendButton}
                        onClick={() => getSignupConfirmationCodeAsync(phoneNumber)}
                    >
                        Send
                    </div>
                </>
            )}
        </section>
    );
};

export const SignupPage = connect(mapStateToProps, mapDispatchToProps)(SignupComponent);
