// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { history } from 'bus/init/middleware/core';
import arrow from 'theme/assets/svg/left-arrow-dark.svg';

export const PageTitle = ({ className, title }) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            <div className={Styles.backButton} onClick={history.goBack}>
                <img src={arrow} alt='back button' />
            </div>
            <p className={Styles.title}>{title}</p>
        </section>
    );
};
