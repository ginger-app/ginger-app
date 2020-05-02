// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

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
    authData: state.auth.get('authData'),
});

const mapDispatchToProps = {
    sendLoginDataAsync: authActions.sendConfirmationCodeAsync,
    sendSignupDataAsync: authActions.sendSignupDataAsync,
    hideCodeConfirmationOverlay: uiActions.hideCodeConfirmationOverlay,
};

const CodeConfirmationOverlayComponent = ({
    className,
    sendLoginDataAsync,
    sendSignupDataAsync,
    hideCodeConfirmationOverlay,
    codeConfirmationOverlay,
    authData: { name, email, phoneNumber, signup },
}) => {
    const [code, setCodeValue] = useState('');

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
                        <div className={Styles.fieldsContainer}>
                            <InputField
                                className={Styles.input}
                                title={'Number'}
                                value={code}
                                onChange={({ target: { value } }) => setCodeValue(value)}
                            />
                            <div
                                className={Styles.button}
                                onClick={
                                    signup
                                        ? () =>
                                              sendSignupDataAsync({
                                                  phoneNumber,
                                                  code,
                                                  userData: {
                                                      phoneNumber,
                                                      email,
                                                      firstName: name.split(' ')[0],
                                                      lastName: name.split(' ')[1] || '',
                                                  },
                                              })
                                        : () => sendLoginDataAsync({ phoneNumber, code })
                                }
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

export const CodeConfirmationOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CodeConfirmationOverlayComponent);
