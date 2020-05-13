// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { OrderDetails } from 'components';

// Instruments
import { isEmpty } from 'lodash';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { marketActions } from 'bus/market/actions';

const mapStateToProps = (state) => ({
    orderData: state.market.get('orderData').toJS(),
});

const mapDispatchToProps = {
    getOrderDataAsync: marketActions.getOrderDataAsync,
    clearOrderData: marketActions.clearOrderData,
};

const OrderComponent = ({ className, id, getOrderDataAsync, clearOrderData, orderData }) => {
    useEffect(() => {
        getOrderDataAsync(id);

        return clearOrderData;
    }, [id]);

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
