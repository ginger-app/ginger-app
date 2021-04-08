// Core
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { Button, Icon, Navigation, OrderItem } from 'components';
import isEmpty from 'lodash/isEmpty';

// Actions
import { marketActions } from 'bus/market/actions';
import { ClientLocationData } from 'domains/supplier/overlays';

const mapStateToProps = (state) => ({
    orderData: state.market.get('orderData').toJS(),
    role: state.profile.role,
});

const mapDispatchToProps = {
    getOrderDataAsync: marketActions.getOrderDataAsync,
    clearOrderData: marketActions.clearOrderData,
};

const OrderComponent = ({ id, getOrderDataAsync, clearOrderData, orderData, role }) => {
    const [overlay, setOverlayState] = useState(false);

    useEffect(() => {
        getOrderDataAsync(id);

        return clearOrderData;
    }, [id, getOrderDataAsync, clearOrderData]);

    const { items, location } = orderData;

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

                    <Button
                        content={<Icon name='dispute' />}
                        className={Styles.disputeButton}
                        onClick={() => console.log('Opening dispute...')}
                    />

                    <OrderItem
                        {...orderData}
                        className={Styles.orderItem}
                        onClick={() => setOverlayState(true)}
                        orderDetails
                    />

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

                    {/* Modals */}
                    <ClientLocationData
                        inProp={overlay}
                        onClick={() => setOverlayState(false)}
                        {...location}
                    />
                </section>
            )}
        </Transition>
    );
};

export const OrderDetailsPage = connect(mapStateToProps, mapDispatchToProps)(OrderComponent);
