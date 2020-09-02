// Core
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import stylePropType from 'react-style-proptype';

export const GradientBorder = ({ className, children, style, onClick }) => {
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

GradientBorder.propTypes = {
    className: PropTypes.string,
    style: stylePropType,
};