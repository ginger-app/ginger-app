// Core
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

export const RadioButton = ({ className, selected, onChange, onSelect, onUnselect }) => {
    return (
        <div
            className={[Styles.container, className].filter(Boolean).join(' ')}
            onClick={
                onSelect && onUnselect
                    ? (e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          return selected ? onUnselect() : onSelect();
                      }
                    : onChange
            }
        >
            <div
                className={[Styles.innerCircle, selected && Styles.selected]
                    .filter(Boolean)
                    .join(' ')}
            />
        </div>
    );
};

RadioButton.propTypes = {
    className: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    onChange: (props) => {
        if (!props.onSelect && !props.onUnselect && !props.onChange)
            return new Error('Either onChange or onSelect+onUnselect must be provided');

        if ((props.onSelect || props.onUnselect) && props.onChange)
            return new Error(
                'Only one of props (either `onChange` or `onSelect+onUnselect`) must be provided',
            );
    },
    onSelect: (props) => {
        if (!props.onSelect && !props.onUnselect && !props.onChange)
            return new Error('Either onChange or onSelect+onUnselect must be provided');

        if ((props.onSelect || props.onUnselect) && props.onChange)
            return new Error(
                'Only one of props (either `onChange` or `onSelect+onUnselect`) must be provided',
            );

        if (props.onSelect && !props.onUnselect)
            return new Error('You should use both onSelect and onUnselect props');
    },
    onUnselect: (props) => {
        if (!props.onSelect && !props.onUnselect && !props.onChange)
            return new Error('Either onChange or onSelect+onUnselect must be provided');

        if ((props.onSelect || props.onUnselect) && props.onChange)
            return new Error(
                'Only one of props (either `onChange` or `onSelect+onUnselect`) must be provided',
            );

        if (!props.onSelect && props.onUnselect)
            return new Error('You should use both onSelect and onUnselect props');
    },
};
