// Core
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { GradientBorder } from 'components';

export const Button = ({ className, onClick, filled, text, content }) => {
    return filled ? (
        <button className={`${Styles.filledButton} ${className}`} onClick={onClick}>
            {text || content}
        </button>
    ) : (
        <GradientBorder className={`${Styles.container} ${className}`}>
            {content || <button className={Styles.button}>{text}</button>}
        </GradientBorder>
    );
};

// Prop types validation
Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    filled: PropTypes.bool,
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
