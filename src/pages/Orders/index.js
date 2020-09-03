// Core
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, OrderItem, Carousel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    orders: state.profile.get('orders'),
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {
    showLoginOverlay: uiActions.showLoginOverlay,
    showOrdersFiltersOverlay: uiActions.showOrdersFiltersOverlay,
};

const OrdersComponent = ({
    orders,
    isAuthenticated,
    showLoginOverlay,
    showOrdersFiltersOverlay,
}) => {
    useEffect(() => {
        if (!isAuthenticated) {
            showLoginOverlay('/');
        }
    }, [isAuthenticated, showLoginOverlay]);

    const statusesImportance = {
        Pending: 1,
        Shipping: 2,
        'Awaiting shipment': 3,
        'Awaiting collection': 4,
        Completed: 5,
        Cancelled: 6,
    };

    const inProgressFirst = (a, b) => statusesImportance[a.status] - statusesImportance[b.status];

    // eslint-disable-next-line
    const getSortedOrders = useCallback(() => orders.sort(inProgressFirst), [orders]);

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
                    className={`${Styles.container}`}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    {/* Title */}
                    <p className={Styles.title}>Orders</p>

                    {/* Orders */}
                    <div className={Styles.ordersSection}>
                        {orders.map((item, index) => (
                            <OrderItem {...item} key={index} index={index} />
                        ))}
                    </div>

                    {/* Fast sorting options */}
                    <Carousel
                        className={Styles.tags}
                        carouselClassName={Styles.carousele}
                        items={Object.keys(statusesImportance).map((item, index) => (
                            <div className={Styles.tag} key={index}>
                                {item}
                            </div>
                        ))}
                    />

                    {/* Footer nav */}
                    <Navigation
                        rightButtonData={{
                            icon: 'filters',
                            onClick: showOrdersFiltersOverlay,
                        }}
                    />
                </section>
            )}
        </Transition>
    );
};

export const OrdersPage = connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);
