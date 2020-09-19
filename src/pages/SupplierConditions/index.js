// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const SupplierConditionsComponent = ({ className }) => {
    const [deliveryToday, setDeliveryTodayState] = useState(true);
    const [minimumSum, setMinimumSum] = useState(500);

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    {/* Title */}
                    <p className={Styles.title}>Умови доставки</p>

                    {/* Conditions */}
                    <p className={Styles.subtitle}>Сроки поставки</p>
                    <div
                        className={[Styles.option, deliveryToday && Styles.selected]
                            .filter(Boolean)
                            .join(' ')}
                        onClick={() => setDeliveryTodayState(true)}
                    >
                        В день замолення
                    </div>
                    <div
                        className={[Styles.option, !deliveryToday && Styles.selected]
                            .filter(Boolean)
                            .join(' ')}
                        onClick={() => setDeliveryTodayState(false)}
                    >
                        Наступний день
                    </div>

                    <p className={Styles.subtitle}>Мінімальна сума замовлення</p>
                    <input
                        className={Styles.priceInput}
                        value={minimumSum}
                        onChange={({ target }) => setMinimumSum(target.value)}
                    />

                    {/* Footer navigation */}
                    <Navigation />
                </section>
            )}
        </Transition>
    );
};

export const SupplierConditions = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierConditionsComponent);
