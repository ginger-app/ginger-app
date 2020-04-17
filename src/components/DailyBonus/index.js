// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const DailyBonusComponent = ({ className }) => {
    const [bonusChosen, setBonusChosen] = useState(false);

    return (
        <section className={`${Styles.container} ${className}`}>
            <p>Твій бонус на сьогодні:</p>
            {bonusChosen ? (
                <div className={Styles.percent}>5%</div>
            ) : (
                <div className={Styles.actionButton} onClick={() => setBonusChosen(true)}>
                    Check
                </div>
            )}
        </section>
    );
};

export const DailyBonus = connect(mapStateToProps, mapDispatchToProps)(DailyBonusComponent);
