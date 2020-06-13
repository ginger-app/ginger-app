// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles

// Components
import { OrderDetails } from 'components';

// Instruments
import { isEmpty } from 'lodash';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { marketActions } from 'bus/market/actions';
import Styles from './styles.module.scss';

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
                    className={`${Styles.bg}`}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <p className={Styles.title}>
                        Замовлення <span>№{id}</span>
                    </p>
                    {isEmpty(orderData) ? <p>Loading....</p> : <OrderDetails id={id} />}
                </section>
            )}
        </Transition>
    );
};

export const OrderDetailsPage = connect(mapStateToProps, mapDispatchToProps)(OrderComponent);
