// Core
import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

// Styles

// Instruments
import { Icon } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import Styles from './styles.module.scss';

export const Toaster = ({
    className,
    containerClassName,
    containerStyles,
    inProp = true,
    message,
    closeToaster,
    children,
}) => {
    const { timeout, defaultStyles, transitionStyles } = bottomToTopSlideConfig(500);

    return (
        <Transition in={inProp} appear mountOnEnter timeout={timeout}>
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
                        {children || (
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

Toaster.propTypes = {
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    inProp: PropTypes.bool.isRequired,
    closeToaster: PropTypes.func,
    message: PropTypes.string,
    children: PropTypes.node,
};
