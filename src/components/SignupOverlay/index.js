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

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    getAuthConfirmationCodeAsync: authActions.getAuthConfirmationCodeAsync,
    sendConfirmationCodeAsync: authActions.sendConfirmationCodeAsync,
    closeCodeConfirmation: authActions.closeCodeConfirmation,
};

const SignupOverlayComponent = ({
    className,
    getAuthConfirmationCodeAsync,
    sendConfirmationCodeAsync,
    closeCodeConfirmation,
    inProp,
}) => {
    return (
        <Portal>
            <Transition
                in={inProp}
                // in
                appear
                mountOnEnter
                unmountOnExit
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
                        <div className={Styles.backButton}>
                            <Icon name='leftArrow' color='black' />
                        </div>
                        <p className={Styles.title}>Signup page title!</p>
                        <div className={Styles.fieldsContainer}>
                            <InputField className={Styles.input} title={'Name'} />
                            <InputField className={Styles.input} title={'Number'} />
                            <InputField className={Styles.input} title={'Email'} />
                            <div className={Styles.button}>
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
