// Core
import React, { FC } from 'react';

// Styles
import Styles from './styles.module.scss';

type GradientBorderPropsType = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

export const GradientBorder: FC<GradientBorderPropsType> = ({
    className,
    children,
    style,
    onClick,
}) => {
    return (
        <section
            className={`${Styles.gradientBorder} ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </section>
    );
};
