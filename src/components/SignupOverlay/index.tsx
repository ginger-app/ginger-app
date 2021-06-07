// Core
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, InputField } from 'components';
import { RoundButton } from 'domains/ui/components';
import { leftToRightSlideConfig } from 'utils/transitionConfig';
import { AsYouType } from 'libphonenumber-js';

// Actions
import { authActions } from 'bus/auth/auth.actions';
import { uiActions } from 'bus/ui/ui.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
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

type SignupOverlayTypes = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

const SignupOverlayComponent: FC<SignupOverlayTypes> = ({
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
    const [historyListener, setRemoveListener] = useState<() => void>();

    useEffect(() => {
        if (signupOverlay) {
            const handler = () => {
                hideSignupOverlay();
                history.go(1);
            };

            window.addEventListener('popstate', handler);

            setRemoveListener(handler);
        } else if (historyListener) {
            window.removeEventListener('popstate', historyListener);
        }
    }, [signupOverlay, hideSignupOverlay, history, historyListener]);

    const handlePhoneNumberChange = (value: string) => {
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
                            className={Styles.backButtonMobile}
                            onClick={() => {
                                // showLoginOverlay();
                                hideSignupOverlay();
                            }}
                        >
                            <Icon name='leftArrow' color='black' />
                        </div>
                        <p className={Styles.title}>Давай закупимось!</p>
                        <div className={Styles.fieldsContainer}>
                            <InputField
                                className={Styles.input}
                                title={"Ім'я"}
                                value={name}
                                onChange={setName}
                                icon='person'
                            />

                            <InputField
                                className={Styles.input}
                                title='Електронна пошта'
                                value={email}
                                onChange={setEmail}
                                icon='atSign'
                            />
                            <InputField
                                className={Styles.input}
                                title='Номер телефону'
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                icon='phone'
                            />
                            <InputField
                                className={Styles.input}
                                title='Назва компанії'
                                value={companyName}
                                onChange={setCompanyName}
                                icon='company'
                            />

                            <RoundButton
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
                                icon='rightArrow'
                                gradient
                            />
                        </div>
                        <RoundButton
                            className={Styles.backButtonTablet}
                            icon='close'
                            size='5rem'
                            onClick={() => hideSignupOverlay()}
                        />
                    </section>
                )}
            </Transition>
        </Portal>
    );
};

export const SignupOverlay = connect(mapStateToProps, mapDispatchToProps)(SignupOverlayComponent);
