// Core
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, InputField } from 'components';
import { leftToRightSlideConfig } from 'utils/transitionConfig';
import { AsYouType } from 'libphonenumber-js';
import phone from 'theme/assets/svg/phone.svg';
import atSign from 'theme/assets/svg/at-sign.svg';
import person from 'theme/assets/svg/person.svg';
import company from 'theme/assets/svg/company.svg';

// Actions
import { authActions } from 'bus/auth/auth.actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    signupOverlay: state.ui.signupOverlay,
    preFilledPhoneNumber: state.auth.authData.phoneNumber,
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
    const [companyName, setCompanyName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();
    const [historyListener, setRemoveListener] = useState();

    useEffect(() => {
        if (signupOverlay) {
            const handler = () => {
                hideSignupOverlay();
                history.go(1);
            };

            window.addEventListener('popstate', handler);

            setRemoveListener(() => handler);
        } else {
            window.removeEventListener('popstate', historyListener);
        }
        // eslint-disable-next-line
    }, [signupOverlay]);

    const handlePhoneNumberChange = (value) => {
        if (!/^[0-9+ ]*$/.test(value)) return null;
        if (value.length < 4 || value.length > 17) return null;

        return setPhoneNumber(new AsYouType('UA').input(value));
    };

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
                            <img className={Styles.icon} src={person} alt='' />
                            <InputField
                                className={Styles.input}
                                title={"Ім'я"}
                                value={name}
                                onChange={setName}
                            />

                            <img className={Styles.icon} src={company} alt='' />
                            <InputField
                                className={Styles.input}
                                title='Назва компанії'
                                value={companyName}
                                onChange={setCompanyName}
                            />

                            <img className={Styles.icon} src={phone} alt='' />
                            <InputField
                                className={Styles.input}
                                title='Номер телефону'
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                            />

                            <img className={Styles.icon} src={atSign} alt='' />
                            <InputField
                                className={Styles.input}
                                title='Електронна пошта'
                                value={email}
                                onChange={setEmail}
                            />
                            <div
                                className={Styles.button}
                                onClick={() => {
                                    setAuthData({
                                        phoneNumber,
                                        name,
                                        companyName,
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
