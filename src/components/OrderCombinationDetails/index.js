// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, OrderCombinationSupplierDetails } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import arrow from 'theme/assets/svg/right-full-arrow.svg';

// Actions
import { marketActions } from 'bus/market/market.actions';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    sendOrdersAsync: marketActions.sendOrdersAsync,
};

const OrderCombinationDetailsComponent = ({
    inProp,
    sum,
    orders,
    image,
    close,
    sendOrdersAsync,
}) => {
    const [supplierDetails, setSupplierDetailsState] = useState(false);

    const { locationId } = useParams();

    return (
        <Transition
            in={inProp}
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
                                    <div
                                        className={Styles.orderBadge}
                                        onClick={() => setSupplierDetailsState(true)}
                                        key={index}
                                    >
                                        <img
                                            className={Styles.supplierImage}
                                            src={supplier.userpic}
                                            alt=''
                                        />

                                        <p className={Styles.supplierName}>
                                            {supplier.companyName}
                                        </p>
                                        <p className={Styles.orderSum}>
                                            {orderSum.toFixed(2)} грн.
                                        </p>

                                        <p className={Styles.itemsAmount}>Items: {items.length}</p>
                                        <img className={Styles.arrow} src={arrow} alt='' />

                                        {/* Overlays */}
                                        <OrderCombinationSupplierDetails
                                            inProp={supplierDetails}
                                            close={(e) => {
                                                e.stopPropagation();
                                                setSupplierDetailsState(false);
                                            }}
                                            items={items}
                                            sum={orderSum}
                                            supplier={supplier}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Navigation
                            backButtonAction={close}
                            centerButton={
                                <div
                                    className={Styles.createOrderButton}
                                    onClick={() =>
                                        sendOrdersAsync(
                                            orders.map((order) => ({
                                                supplier: order.supplier._id,
                                                location: locationId,
                                                items: order.items.map((item) => ({
                                                    item: item._id,
                                                    supplier: order.supplier._id,
                                                    price: item.prices[order.supplier._id],
                                                    amount: item.requestedAmount,
                                                })),
                                                sum: order.sum.toFixed(2),
                                            })),
                                        )
                                    }
                                >
                                    Відправити
                                </div>
                            }
                        />
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
