// Core
import React, { FC } from 'react';
// import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { GradientBorder } from 'components';

type ButtonPropsTypes = {
    className?: string;
    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    filled?: boolean;
    content: React.ReactNode;
    gradientText?: boolean;
    fontWeight?: 'normal' | 'bold';
    contentClassName?: string;
};

export const Button: FC<ButtonPropsTypes> = ({
    className,
    onClick,
    filled,
    content,
    gradientText,
    fontWeight,
    contentClassName,
}) => {
    return filled ? (
        <button className={`${Styles.filledButton} ${className}`} onClick={onClick}>
            {content}
        </button>
    ) : (
        <GradientBorder className={`${Styles.container} ${className}`} onClick={onClick}>
            {content || (
                <button className={`${Styles.button}  ${contentClassName}`}>
                    <span
                        className={gradientText && Styles.gradientText}
                        style={{
                            fontWeight,
                        }}
                    >
                        {content}
                    </span>
                </button>
            )}
        </GradientBorder>
    );
};
