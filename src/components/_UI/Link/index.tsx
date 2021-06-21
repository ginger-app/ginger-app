// Core
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { GradientBorder } from 'components';
import { LocationDescriptor } from 'history';

type LinkPropsTypes = {
    className?: string;
    onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    filled?: boolean;
    text: string;
    content?: React.ReactNode;
    gradientText?: boolean;
    fontWeight?: 'normal' | 'bold';
    whiteBackground?: boolean;
    to: LocationDescriptor<unknown>;
};

export const Link: FC<LinkPropsTypes> = ({
    className,
    onClick,
    filled,
    text,
    content,
    gradientText,
    fontWeight,
    whiteBackground,
    to,
}) => {
    return filled ? (
        <NavLink className={`${Styles.filledButton} ${className}`} to={to} onClick={onClick}>
            {text || content}
        </NavLink>
    ) : (
        <GradientBorder className={`${Styles.container} ${className}`}>
            {content || (
                <NavLink
                    className={`${Styles.button} ${whiteBackground && Styles.whiteBackground}`}
                    to={to}
                >
                    <span
                        className={gradientText && Styles.gradientText}
                        style={{
                            fontWeight,
                        }}
                    >
                        {text}
                    </span>
                </NavLink>
            )}
        </GradientBorder>
    );
};
