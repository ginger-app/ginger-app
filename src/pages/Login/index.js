// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Components
import { InputField } from '../../components';

// Instruments
import { AsYouType } from 'libphonenumber-js';
import { book } from '../../core/book';
import arrow from '../../theme/assets/svg/left-arrow-dark.svg';

// Actions
import { authActions } from '../../bus/auth/actions';

const mapStateToProps = ({ auth }) => ({
    codeConfirmationPage: auth.get('codeConfirmation'),
});

const mapDispatchToProps = {
    getAuthConfirmationCodeAsync: authActions.getAuthConfirmationCodeAsync,
    sendConfirmationCodeAsync: authActions.sendConfirmationCodeAsync,
    closeCodeConfirmation: authActions.closeCodeConfirmation,
};

const LoginComponent = ({
    getAuthConfirmationCodeAsync,
    sendConfirmationCodeAsync,
    codeConfirmationPage,
    closeCodeConfirmation,
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
            <NavLink
                className={Styles.backButton}
                to={codeConfirmationPage ? book.signin : book.market}
                onClick={codeConfirmationPage ? closeCodeConfirmation : null}
            >
                <img src={arrow} alt='back button' />
            </NavLink>
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
