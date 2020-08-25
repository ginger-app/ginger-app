// Core
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

export const RadioButton = ({ className, selected, onChange }) => {
    return (
        <div className={[Styles.container, className].filter(Boolean).join(' ')} onClick={onChange}>
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
    onChange: PropTypes.func.isRequired,
};
