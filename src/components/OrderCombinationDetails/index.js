// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import arrow from 'theme/assets/svg/right-full-arrow.svg';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const OrderCombinationDetailsComponent = ({ inProp, sum, orders, image, close }) => {
    return (
        <Transition
            in={inProp}
            // in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <Portal>
                    <section
                        className={[Styles.container].filter(Boolean).join(' ')}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[state],
                        }}
                    >
                        <p className={Styles.title}>Combination details</p>

                        <img className={Styles.offerImage} src={image} alt='' />

                        <p className={Styles.sumTitle}>Загальна сума, грн</p>
                        <p className={Styles.sum}>{sum.toFixed(2)}</p>

                        <div className={Styles.orders}>
                            <p className={Styles.ordersTitle}>Постачальників: {orders.length}</p>
                            <div className={Styles.ordersContainer}>
                                {orders.map(({ items, supplier, sum: orderSum }, index) => (
                                    <div className={Styles.orderBadge} key={index}>
                                        <img
                                            className={Styles.supplierImage}
                                            src={supplier.userpic}
                                            alt=''
                                        />

                                        <p className={Styles.supplierName}>{supplier.name}</p>
                                        <p className={Styles.orderSum}>
                                            {orderSum.toFixed(2)} грн.
                                        </p>

                                        <p className={Styles.itemsAmount}>Items: {items.length}</p>
                                        <img className={Styles.arrow} src={arrow} alt='' />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Navigation backButtonAction={close} />
                    </section>
                </Portal>
            )}
        </Transition>
    );
};

export const OrderCombinationDetails = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderCombinationDetailsComponent);
