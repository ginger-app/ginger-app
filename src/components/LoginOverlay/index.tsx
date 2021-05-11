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
import { AsYouType } from 'libphonenumber-js';

// Actions
import { authActions } from 'bus/auth/auth.actions';
import { uiActions } from 'bus/ui/ui.actions';
import { RoundButton } from 'domains/ui/components';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    loginOverlay: state.ui.loginOverlay,
    backButtonPath: state.ui.backButtonPath,
});

const mapDispatchToProps = {
    getSigninConfirmationCodeAsync: authActions.getSigninConfirmationCodeAsync,
    setAuthData: authActions.setAuthData,
    hideLoginOverlay: uiActions.hideLoginOverlay,
    showSignupOverlay: uiActions.showSignupOverlay,
};

// typeof mapDispatchToProps === сигнатура об'єкта mapDispatchToProps
// ReturnType<typeof mapStateToProps> === сигнатура того, що повертається із функції mapStateToProps
type LoginOverlayTypes = typeof mapDispatchToProps & ReturnType<typeof mapStateToProps>;

const LoginOverlayComponent: FC<LoginOverlayTypes> = ({
    getSigninConfirmationCodeAsync,
    loginOverlay,
    hideLoginOverlay,
    setAuthData,
    backButtonPath,
}) => {
    const [phoneNumber, setPhoneNumber] = useState('+380639999999');

    const history = useHistory();
    const [historyListener, setRemoveListener] = useState<() => () => void>();

    useEffect(() => {
        if (loginOverlay) {
            const handler = () => {
                hideLoginOverlay();
                history.go(1);
            };

            window.addEventListener('popstate', handler);

            setRemoveListener(() => handler);
        } else {
            // @ts-ignore
            window.removeEventListener('popstate', historyListener);
        }
        // eslint-disable-next-line
    }, [loginOverlay]);

    const _handlePhoneNumberChange = (value: string) => {
        if (!/^[0-9+ ]*$/.test(value)) return null;
        if (value.length < 4 || value.length > 18) return null;

        return setPhoneNumber(new AsYouType('UA').input(value));
    };

    const _handleKeyPress: KeyboardEventHandler<HTMLDivElement> = (e) => {
        if (e.key === 'Enter') {
            setAuthData({ phoneNumber });
            getSigninConfirmationCodeAsync(phoneNumber);
        }
    };

    return (
        <Portal>
            <Transition in={loginOverlay} appear timeout={leftToRightSlideConfig().timeout}>
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
                        <p className={Styles.title}>Давай закупимось!</p>
                        <div className={Styles.fieldsContainer} onKeyPress={_handleKeyPress}>
                            <InputField
                                className={Styles.input}
                                title='Номер телефону'
                                value={phoneNumber}
                                onChange={_handlePhoneNumberChange}
                                buttonAction={() => {
                                    setAuthData({ phoneNumber });
                                    getSigninConfirmationCodeAsync(phoneNumber);
                                }}
                                icon='phone'
                                autoFocus
                            />
                        </div>

                        <RoundButton
                            className={Styles.backButtonTablet}
                            icon='close'
                            size='5rem'
                            onClick={
                                backButtonPath
                                    ? () => {
                                          history.push(backButtonPath);
                                          hideLoginOverlay();
                                      }
                                    : hideLoginOverlay
                            }
                        />
                    </section>
                )}
            </Transition>
        </Portal>
    );
};

export const LoginOverlay = connect(mapStateToProps, mapDispatchToProps)(LoginOverlayComponent);
