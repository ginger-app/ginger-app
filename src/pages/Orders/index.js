// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, OrderItem, Carousel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    orders: state.profile.get('orders'),
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {
    showLoginOverlay: uiActions.showLoginOverlay,
    showOrdersFiltersOverlay: uiActions.showOrdersFiltersOverlay,
    getClientOrdersAsync: profileActions.getClientOrdersAsync,
};

const OrdersComponent = ({
    orders,
    isAuthenticated,
    showLoginOverlay,
    showOrdersFiltersOverlay,
    getClientOrdersAsync,
}) => {
    useEffect(() => {
        if (!isAuthenticated) {
            showLoginOverlay('/');
        } else {
            getClientOrdersAsync();
        }
    }, [isAuthenticated, showLoginOverlay, getClientOrdersAsync]);

    const statusesImportance = {
        Pending: 1,
        Shipping: 2,
        'Awaiting shipment': 3,
        'Awaiting collection': 4,
        Completed: 5,
        Cancelled: 6,
    };

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
                        {orders.map(
                            (item, index) =>
                                /**
                                 * On first load, all items are ObjectID strings and
                                 * we don't want to display those untill they get populated
                                 */
                                typeof item !== 'string' && (
                                    <OrderItem {...item} key={index} index={index} />
                                ),
                        )}
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
