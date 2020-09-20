// Core
import React from 'react';

// Styles
import Styles from './styles.module.scss';

export const Dummy = ({ className }) => {
    return <div className={[Styles.container, className].filter(Boolean).join(' ')} />;
};
