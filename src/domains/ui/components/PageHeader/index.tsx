// Core
import React, { FC, ReactElement } from 'react';

// Styles
import Styles from './styles.module.scss';

type PageHeaderProps = {
    className?: string;
    title: string;
};

export const PageHeader: FC<PageHeaderProps> = ({ className, title }): ReactElement => {
    return (
        <section className={[Styles.container, className].filter(Boolean).join(' ')}>
            <p className={Styles.pageTitle}>{title}</p>
        </section>
    );
};
