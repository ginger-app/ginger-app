// Core
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { history } from 'bus/init/middleware/core';
import arrow from 'theme/assets/svg/left-arrow-dark.svg';

export const PageTitle = ({ className, title, leftButton, rightButton, centerButton }) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            {leftButton ? (
                leftButton
            ) : (
                <div className={Styles.backButton} onClick={history.goBack}>
                    <img src={arrow} alt='back button' />
                </div>
            )}
            {centerButton ? centerButton : <p className={Styles.title}>{title}</p>}
            {rightButton}
        </section>
    );
};

PageTitle.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    leftButton: PropTypes.element,
    rightButton: PropTypes.element,
    centerButton: PropTypes.element,
};
