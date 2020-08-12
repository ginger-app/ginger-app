// Core
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

export const GradientBorder = ({ className, children }) => {
    return <section className={`${Styles.gradientBorder} ${className}`}>{children}</section>;
};

GradientBorder.propTypes = {
    className: PropTypes.string,
};
