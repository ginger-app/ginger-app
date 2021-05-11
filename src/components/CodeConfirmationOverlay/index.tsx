// Core
import React, { FC, KeyboardEventHandler, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';
import { useHistory } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, InputField } from 'components';
import { leftToRightSlideConfig } from 'utils/transitionConfig';
import { RoundButton } from 'domains/ui/components';

// Actions
import { authActions } from 'bus/auth/auth.actions';
import { uiActions } from 'bus/ui/ui.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    codeConfirmationOverlay: state.ui.codeConfirmationOverlay,
    authData: state.auth.authData,
});

const mapDispatchToProps = {
    sendLoginDataAsync: authActions.signinAsync,
    sendSignupDataAsync: authActions.sendSignupDataAsync,
    hideCodeConfirmationOverlay: uiActions.hideCodeConfirmationOverlay,
};

type CodeConfirmationOverlayTypes = typeof mapDispatchToProps &
    ReturnType<typeof mapStateToProps> &
    Record<'className', string>;

const CodeConfirmationOverlayComponent: FC<CodeConfirmationOverlayTypes> = ({
    className,
    sendLoginDataAsync,
    sendSignupDataAsync,
    hideCodeConfirmationOverlay,
    codeConfirmationOverlay,
    authData: { name, email, phoneNumber, signup, companyName },
}) => {
    const [code, setCodeValue] = useState('');

    const history = useHistory();
    const [historyListener, setRemoveListener] = useState<() => () => void>();

    useEffect(() => {
        if (codeConfirmationOverlay) {
            const handler = () => {
                hideCodeConfirmationOverlay();
                history.go(1);
            };

            window.addEventListener('popstate', handler);

            setRemoveListener(() => handler);
        } else {
            // @ts-ignore
            window.removeEventListener('popstate', historyListener);
        }
        // eslint-disable-next-line
    }, [codeConfirmationOverlay]);

    const _handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (e) => {
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
                        <div
                            className={Styles.backButtonMobile}
                            onClick={hideCodeConfirmationOverlay}
                        >
                            <Icon name='leftArrow' color='black' />
                        </div>
                        <p className={Styles.title}>На тиждень!</p>
                        <div className={Styles.fieldsContainer} onKeyPress={_handleKeyPress}>
                            <InputField
                                className={Styles.input}
                                title='Код з СМС'
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
                        <div className={Styles.resendCode}>Відправити ще раз</div>
                        <RoundButton
                            className={Styles.backButtonTablet}
                            icon='close'
                            size='5rem'
                            onClick={hideCodeConfirmationOverlay}
                        />
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
