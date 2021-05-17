// Core
import React, { FC, ReactNode } from 'react';
import { Transition } from 'react-transition-group';

// Styles

// Instruments
import { Icon } from 'components';
import { bottomToTopSlideConfig } from 'utils/transitionConfig';
import Styles from './styles.module.scss';

type ToasterPropsType = {
    className?: string;
    containerClassName?: string;
    inProp: boolean;
    closeToaster?: () => void;
    message?: string;
    children?: ReactNode;
    containerStyles?: Record<string, any>;
};

export const Toaster: FC<ToasterPropsType> = ({
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
