// Core
import React from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const CatalogueComponent = ({ className }) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            <p className={Styles.title}>Catalogue</p>
            <div className={Styles.showcase}>
                <div className={Styles.item} />
                <div className={Styles.item} />
                <div className={Styles.item} />
                <div className={Styles.item} />
                <div className={Styles.item} />
                <div className={Styles.item} />
                <div className={Styles.item} />
                <div className={Styles.item} />
                <div className={Styles.item} />
                <div className={Styles.item} />
                <div className={Styles.item} />
                <div className={Styles.item} />
            </div>
        </section>
    );
};

export const Catalogue = connect(mapStateToProps, mapDispatchToProps)(CatalogueComponent);
