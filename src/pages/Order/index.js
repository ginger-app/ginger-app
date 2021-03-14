// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { Navigation, OrderItem } from 'components';
import { DateTime } from 'luxon';
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

    const { items } = orderData;

    console.log(items);

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
                    <p className={Styles.title}>Деталі замовлення</p>

                    <OrderItem {...orderData} className={Styles.orderItem} orderDetails />

                    {/* Orders */}
                    <div className={Styles.productsHeader}>
                        <div />
                        <span>Назва товару</span>
                        <span>К-ть</span>
                        <span>Ціна, грн</span>
                    </div>
                    <div className={Styles.products}>
                        {items.map(({ item, price, amount }, index) => (
                            <div className={Styles.productItem} key={index}>
                                <img src={item.image} alt='' />
                                <p className={Styles.name}>{item.name}</p>
                                <p className={Styles.amount}>
                                    {amount} {item.unit}
                                </p>
                                <p className={Styles.price}>{(price * amount).toFixed(2)}</p>
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
