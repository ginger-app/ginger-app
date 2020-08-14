// Core
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { GradientBorder } from 'components';

export const Link = ({
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

// Prop types validation
Link.propTypes = {
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    filled: PropTypes.bool,
    gradientText: PropTypes.bool,
    fontWeight: PropTypes.oneOf(['normal', 'bold']),
    whiteBackground: PropTypes.bool,
    content: (props, propName, componentName) => {
        if (!props.content && !props.text) {
            return new Error(`One of props 'content' or 'text' must exist in '${componentName}'.`);
        }

        if (props.content) {
            PropTypes.checkPropTypes(
                {
                    content: PropTypes.node,
                },
                { content: props.content },
                'prop',
                componentName,
            );
        }

        return null;
    },
    text: (props, propName, componentName) => {
        if (!props.content && !props.text) {
            return new Error(`One of props 'content' or 'text' must exist in '${componentName}'.`);
        }

        if (props.text) {
            PropTypes.checkPropTypes(
                {
                    text: PropTypes.string,
                },
                { text: props.text },
                'prop',
                componentName,
            );
        }

        return null;
    },
};
