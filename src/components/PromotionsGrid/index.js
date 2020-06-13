// Core
import React from 'react';
import { connect } from 'react-redux';

// Styles
import { MarketItem } from 'components';
import Styles from './styles.module.scss';

// Components

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const PromotionsGridComponent = ({ className }) => {
    return (
        <section className={`${Styles.container} ${className}`}>
            <p className={Styles.title}>Promotions</p>
            <MarketItem nameUkr='Item 1' />
            <MarketItem nameUkr='Item 2' />
            <div className={Styles.showMoreButton}>Show more</div>
        </section>
    );
};

export const PromotionsGrid = connect(mapStateToProps, mapDispatchToProps)(PromotionsGridComponent);
