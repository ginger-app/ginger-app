// Core
import React from 'react';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

export const Toaster = ({
    className,
    containerClassName,
    containerStyles,
    inProp = true,
    message,
    closeToaster,
    children,
}) => {
    const { timeout, defaultStyles, transitionStyles } = bottomToTopSlideConfig(1000);

    return (
        <Transition in={inProp} appear mountOnEnter unmountOnExit timeout={timeout}>
            {(state) => (
                <section
                    className={`${Styles.toasterContainer} ${containerClassName}`}
                    style={{
                        ...defaultStyles,
                        ...transitionStyles[state],
                        ...containerStyles,
                    }}
                >
                    <div className={`${Styles.toaster} ${className}`}>
                        {children ? (
                            children
                        ) : (
                            <>
                                {message}
                                <Icon
                                    name='close'
                                    color='white'
                                    onClick={closeToaster}
                                    className={Styles.closeIcon}
                                />
                            </>
                        )}
                    </div>
                </section>
            )}
        </Transition>
    );
};
