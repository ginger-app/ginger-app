// Core
import React from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { GradientBorder } from 'components';
import button from 'theme/assets/svg/plus-button.svg';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const CreateNewOrderComponent = ({ className }) => {
    // TEMP
    const unfinishedOrder = true;

    return (
        <section
            className={`${Styles.container} ${
                unfinishedOrder && Styles.unfinishedOrder
            } ${className}`}
        >
            <div
                className={`${Styles.newOrderButton} ${unfinishedOrder && Styles.minified}`}
                onClick={() => null}
            >
                <p className={Styles.newOrderText}>Create new order</p>
                <img src={button} alt='' />
            </div>
            {unfinishedOrder && (
                <GradientBorder>
                    <div className={Styles.backToOrderButton} onClick={() => null}>
                        <p className={Styles.backToOrdertext}>Continue ordering</p>
                        <img src={button} alt='' />
                    </div>
                </GradientBorder>
            )}
        </section>
    );
};

export const CreateNewOrder = connect(mapStateToProps, mapDispatchToProps)(CreateNewOrderComponent);
