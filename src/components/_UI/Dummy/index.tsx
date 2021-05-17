// Core
import React, { FC } from 'react';

// Styles
import Styles from './styles.module.scss';

type DummyPropsTypes = {
    className?: string;
};

export const Dummy: FC<DummyPropsTypes> = ({ className }) => {
    return <div className={[Styles.container, className].filter(Boolean).join(' ')} />;
};
