// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { OrderStatusLabel, Button, Navigation } from 'components';
import { DateTime } from 'luxon';
import eye from 'theme/assets/svg/eye.svg';
import isEmpty from 'lodash/isEmpty';

// Actions
import { marketActions } from 'bus/market/actions';

const mapStateToProps = (state) => ({
    orderData: state.market.get('orderData').toJS(),
});

const mapDispatchToProps = {
    getOrderDataAsync: marketActions.getOrderDataAsync,
    clearOrderData: marketActions.clearOrderData,
};

const OrderComponent = ({ id, getOrderDataAsync, clearOrderData, orderData }) => {
    useEffect(() => {
        getOrderDataAsync(id);

        return clearOrderData;
    }, [id, getOrderDataAsync, clearOrderData]);

    const { location, supplier, items, status, deliveryDate, sum } = orderData;

    return (
        <Transition
            in={!isEmpty(orderData)}
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={Styles.container}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    {/* Title */}
                    <p className={Styles.title}>Order info</p>

                    {/* Order info */}
                    <p className={Styles.date}>{DateTime.fromISO(deliveryDate).toLocaleString()}</p>
                    <OrderStatusLabel status={status} className={Styles.orderStatusLabel} />

                    {/* Location */}
                    <p className={Styles.locationSubtitle}>Location:</p>
                    <p className={Styles.location}>{location.locationName}</p>

                    {/* Supplier */}
                    <p className={Styles.supplierSubtitle}>Supplier:</p>
                    <div className={Styles.supplier}>
                        <span>{supplier.companyName}</span>
                        <Button
                            className={Styles.detailsButton}
                            content={<img src={eye} alt='' />}
                            onClick={() => null}
                            filled
                        />
                    </div>

                    {/* Order id */}
                    <p className={Styles.orderIdSubtitle}>Order id:</p>
                    <p className={Styles.orderId}>{id}</p>

                    {/* Sum */}
                    <p className={Styles.sumSubtitle}>Sum:</p>
                    <p className={Styles.sum}>{sum}</p>

                    {/* Orders */}
                    <div className={Styles.products}>
                        {items.map(({ item, price, amount }, index) => (
                            <div className={Styles.productItem} key={index}>
                                <img src={item.image} alt='' />
                                <p className={Styles.name}>{item.name}</p>
                                <p className={Styles.amount}>
                                    {item.price} {item.unit}
                                </p>
                                <p className={Styles.price}>{price * amount}</p>
                            </div>
                        ))}
                    </div>

                    <Navigation
                        rightButtonData={{
                            onClick: () => null,
                            icon: 'export',
                        }}
                    />
                </section>
            )}
        </Transition>
    );
};

export const OrderDetailsPage = connect(mapStateToProps, mapDispatchToProps)(OrderComponent);
