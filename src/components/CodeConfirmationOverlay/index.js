// Core
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';
import { useHistory } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, InputField } from 'components';
import { leftToRightSlideConfig } from 'utils/transitionConfig';

// Actions
import { authActions } from 'bus/auth/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    codeConfirmationOverlay: state.ui.get('codeConfirmationOverlay'),
    authData: state.auth.authData,
});

const mapDispatchToProps = {
    sendLoginDataAsync: authActions.signinAsync,
    sendSignupDataAsync: authActions.sendSignupDataAsync,
    hideCodeConfirmationOverlay: uiActions.hideCodeConfirmationOverlay,
};

const CodeConfirmationOverlayComponent = ({
    className,
    sendLoginDataAsync,
    sendSignupDataAsync,
    hideCodeConfirmationOverlay,
    codeConfirmationOverlay,
    authData: { name, email, phoneNumber, signup, companyName },
}) => {
    const [code, setCodeValue] = useState('');

    const history = useHistory();
    const [historyListener, setRemoveListener] = useState();

    useEffect(() => {
        if (codeConfirmationOverlay) {
            const handler = () => {
                hideCodeConfirmationOverlay();
                history.go(1);
            };

            window.addEventListener('popstate', handler);

            setRemoveListener(() => handler);
        } else {
            window.removeEventListener('popstate', historyListener);
        }
        // eslint-disable-next-line
    }, [codeConfirmationOverlay]);

    const _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            return signup
                ? sendSignupDataAsync({
                      phoneNumber,
                      code,
                      userData: {
                          phoneNumber,
                          companyName,
                          email,
                          name,
                      },
                  })
                : sendLoginDataAsync({ phoneNumber, code });
        }
    };

    return (
        <Portal>
            <Transition
                in={codeConfirmationOverlay}
                appear
                mountOnEnter
                timeout={leftToRightSlideConfig().timeout}
            >
                {(state) => (
                    <section
                        className={`${Styles.container} ${className}`}
                        style={{
                            ...leftToRightSlideConfig().defaultStyles,
                            ...leftToRightSlideConfig().transitionStyles[state],
                        }}
                    >
                        <div className={Styles.backButton} onClick={hideCodeConfirmationOverlay}>
                            <Icon name='leftArrow' color='black' />
                        </div>
                        <p className={Styles.title}>CodeConfirmation page title!</p>
                        <div className={Styles.fieldsContainer} onKeyPress={_handleKeyPress}>
                            <InputField
                                className={Styles.input}
                                title='Number'
                                value={code}
                                onChange={setCodeValue}
                                buttonAction={
                                    signup
                                        ? () =>
                                              sendSignupDataAsync({
                                                  phoneNumber,
                                                  code,
                                                  userData: {
                                                      phoneNumber,
                                                      companyName,
                                                      email,
                                                      name,
                                                  },
                                              })
                                        : () => sendLoginDataAsync({ phoneNumber, code })
                                }
                                autoFocus
                            />
                        </div>
                        <div className={Styles.resendCode}>Resend code</div>
                    </section>
                )}
            </Transition>
        </Portal>
    );
};

export const CodeConfirmationOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CodeConfirmationOverlayComponent);
