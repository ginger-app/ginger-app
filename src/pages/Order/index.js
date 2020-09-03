// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { OrderStatusLabel, Button, Navigation } from 'components';
import eye from 'theme/assets/svg/eye.svg';

// Actions
import { marketActions } from 'bus/market/actions';

const products = new Array(15).fill(eye);

const mapStateToProps = (state) => ({
    orderData: state.market.get('orderData').toJS(),
});

const mapDispatchToProps = {
    getOrderDataAsync: marketActions.getOrderDataAsync,
    clearOrderData: marketActions.clearOrderData,
};

const OrderComponent = ({ id, getOrderDataAsync, clearOrderData }) => {
    useEffect(() => {
        getOrderDataAsync(id);

        return clearOrderData;
    }, [id, getOrderDataAsync, clearOrderData]);

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
                    className={Styles.container}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    {/* Title */}
                    <p className={Styles.title}>Order info</p>

                    {/* Order info */}
                    <p className={Styles.date}>12.34.5678</p>
                    <OrderStatusLabel status='Completed' className={Styles.orderStatusLabel} />

                    {/* Location */}
                    <p className={Styles.locationSubtitle}>Location:</p>
                    <p className={Styles.location}>Forma.coffee</p>

                    {/* Supplier */}
                    <p className={Styles.supplierSubtitle}>Supplier:</p>
                    <div className={Styles.supplier}>
                        <span>Galychyna</span>
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
                    <p className={Styles.sum}>{100.23}</p>

                    {/* Orders */}
                    <div className={Styles.products}>
                        {products.map((item, index) => (
                            <div className={Styles.productItem} key={index}>
                                <img src={item} alt='' />
                                <p className={Styles.name}>Champion apples</p>
                                <p className={Styles.amount}>2 kg</p>
                                <p className={Styles.price}>87.98</p>
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
