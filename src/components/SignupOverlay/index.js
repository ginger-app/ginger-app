// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles

// Instruments
import { Icon, InputField } from 'components';
import { leftToRightSlideConfig } from 'utils/transitionConfig';
import { AsYouType } from 'libphonenumber-js';
// import { validate as validateEmail } from 'email-validator';

// Actions
import { authActions } from 'bus/auth/actions';
import { uiActions } from 'bus/ui/actions';
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    signupOverlay: state.ui.get('signupOverlay'),
    preFilledPhoneNumber: state.auth.get('authData').phoneNumber,
});

const mapDispatchToProps = {
    getSignupConfirmationCodeAsync: authActions.getSignupConfirmationCodeAsync,
    setAuthData: authActions.setAuthData,
    showLoginOverlay: uiActions.showLoginOverlay,
    showCodeOverlay: uiActions.showCodeConfirmationOverlay,
    hideSignupOverlay: uiActions.hideSignupOverlay,
};

const SignupOverlayComponent = ({
    getSignupConfirmationCodeAsync,
    signupOverlay,
    hideSignupOverlay,
    setAuthData,
    preFilledPhoneNumber,
}) => {
    const [phoneNumber, setPhoneNumber] = useState(preFilledPhoneNumber || '+380');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handlePhoneNumberChange = ({ target: { value } }) => {
        if (!/^[0-9+ ]*$/.test(value)) return null;
        if (value.length < 4 || value.length > 17) return null;

        return setPhoneNumber(new AsYouType('UA').input(value));
    };

    const handleNameChange = ({ target: { value } }) =>
        /^[A-Za-z -]*$/.test(value) ? setName(value) : null;

    return (
        <Portal>
            <Transition
                in={signupOverlay}
                appear
                mountOnEnter
                timeout={leftToRightSlideConfig().timeout}
            >
                {(state) => (
                    <section
                        className={Styles.container}
                        style={{
                            ...leftToRightSlideConfig().defaultStyles,
                            ...leftToRightSlideConfig().transitionStyles[state],
                        }}
                    >
                        <div
                            className={Styles.backButton}
                            onClick={() => {
                                // showLoginOverlay();
                                hideSignupOverlay();
                            }}
                        >
                            <Icon name='leftArrow' color='black' />
                        </div>
                        <p className={Styles.title}>Signup page title!</p>
                        <div className={Styles.fieldsContainer}>
                            <InputField
                                className={Styles.input}
                                title={"Ім'я та Прізвище"}
                                value={name}
                                onChange={handleNameChange}
                            />
                            <InputField
                                className={Styles.input}
                                title='Номер телефону'
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                // className={phoneNumber.length === 4 && Styles.unfinishedPhoneNumber}
                            />
                            <InputField
                                className={Styles.input}
                                title='Електронна пошта'
                                value={email}
                                onChange={({ target: { value } }) => setEmail(value)}
                            />
                            <div
                                className={Styles.button}
                                onClick={() => {
                                    setAuthData({
                                        phoneNumber,
                                        name,
                                        email,
                                        signup: true,
                                    });
                                    getSignupConfirmationCodeAsync(phoneNumber);
                                }}
                            >
                                <Icon name='rightArrow' color='white' />
                            </div>
                        </div>
                    </section>
                )}
            </Transition>
        </Portal>
    );
};

export const SignupOverlay = connect(mapStateToProps, mapDispatchToProps)(SignupOverlayComponent);
