// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {
    showLoginOverlay: uiActions.showLoginOverlay,
};

const DailyBonusComponent = ({ className, isAuthenticated, showLoginOverlay }) => {
    const [bonusOpened, setBonusOpenedState] = useState(false);

    useEffect(() => {
        const bonusOpenedDate = localStorage.getItem('opto-market-bonus-opened-date');

        if (bonusOpenedDate) {
            setBonusOpenedState(
                isAuthenticated && bonusOpenedDate === new Date().toLocaleDateString(),
            );
        }
    }, [isAuthenticated]);

    const _handleBonusOpen = () => {
        if (!isAuthenticated) return showLoginOverlay();

        localStorage.setItem('opto-market-bonus-opened-date', new Date().toLocaleDateString());
        return setBonusOpenedState(true);
    };

    return (
        <section className={`${Styles.container} ${className}`}>
            <p className={Styles.title}>Твій бонус на сьогодні:</p>
            {bonusOpened && isAuthenticated ? (
                <div className={Styles.percent}>5%</div>
            ) : (
                <div className={Styles.actionButton} onClick={_handleBonusOpen}>
                    Check
                </div>
            )}
        </section>
    );
};

export const DailyBonus = connect(mapStateToProps, mapDispatchToProps)(DailyBonusComponent);
