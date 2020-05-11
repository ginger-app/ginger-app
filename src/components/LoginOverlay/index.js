// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { history } from 'bus/init/middleware/core';
import { Icon, InputField } from 'components';
import { leftToRightSlideConfig } from 'utils/transitionConfig';
import { AsYouType } from 'libphonenumber-js';

// Actions
import { authActions } from 'bus/auth/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    loginOverlay: state.ui.get('loginOverlay'),
    backButtonPath: state.ui.get('backButtonPath'),
});

const mapDispatchToProps = {
    getAuthConfirmationCodeAsync: authActions.getAuthConfirmationCodeAsync,
    setAuthData: authActions.setAuthData,
    hideLoginOverlay: uiActions.hideLoginOverlay,
    showSignupOverlay: uiActions.showSignupOverlay,
};

const LoginOverlayComponent = ({
    getAuthConfirmationCodeAsync,
    loginOverlay,
    hideLoginOverlay,
    setAuthData,
    backButtonPath,
}) => {
    const [phoneNumber, setPhoneNumber] = useState('+380');

    const handlePhoneNumberChange = ({ target: { value } }) => {
        if (!/^[0-9+ ]*$/.test(value)) return null;
        if (value.length < 4 || value.length > 18) return null;

        return setPhoneNumber(new AsYouType('UA').input(value));
    };

    return (
        <Portal>
            <Transition
                in={loginOverlay}
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
                            onClick={
                                backButtonPath
                                    ? () => {
                                          history.push(backButtonPath);
                                          hideLoginOverlay();
                                      }
                                    : hideLoginOverlay
                            }
                        >
                            <Icon name='leftArrow' color='black' />
                        </div>
                        <p className={Styles.title}>Login page title!</p>
                        <div className={Styles.fieldsContainer}>
                            <InputField
                                className={Styles.input}
                                title={'Номер телефону'}
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                            />
                            <div
                                className={Styles.button}
                                onClick={() => {
                                    setAuthData({ phoneNumber });
                                    getAuthConfirmationCodeAsync(phoneNumber);
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

export const LoginOverlay = connect(mapStateToProps, mapDispatchToProps)(LoginOverlayComponent);
