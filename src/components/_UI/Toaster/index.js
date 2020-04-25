// Core
import React from 'react';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';

export const Toaster = ({ className, inProp = true, message, closeToaster }) => {
    const { timeout, defaultStyles, transitionStyles } = bottomToTopSlideConfig(1000);

    return (
        <Transition in={inProp} appear mountOnEnter unmountOnExit timeout={timeout}>
            {(state) => (
                <section
                    className={`${Styles.container} ${className}`}
                    style={{
                        ...defaultStyles,
                        ...transitionStyles[state],
                    }}
                >
                    <div className={Styles.toaster}>
                        {message}
                        <Icon
                            name='close'
                            color='white'
                            onClick={closeToaster}
                            className={Styles.closeIcon}
                        />
                    </div>
                </section>
            )}
        </Transition>
    );
};
