// Core
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, OrderItem, Carousel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

const mapStateToProps = (state) => ({
    orders: state.profile.orders,
    isAuthenticated: state.auth.isAuthenticated,
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
    const [filteringOption, setFilteringOption] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            showLoginOverlay('/');
        } else {
            getClientOrdersAsync();
        }
    }, [isAuthenticated, showLoginOverlay, getClientOrdersAsync]);

    const statuses = {
        Pending: 'Очікує підтвердження',
        Shipping: 'В дорозі',
        'Awaiting shipment': 'Очікує на доставку',
        'Awaiting collection': 'Збирається',
        Completed: 'Завершений',
        Cancelled: 'Відмінений',
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
                        {orders
                            .filter((item) => item.status.includes(filteringOption))
                            .map(
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
                        items={[
                            <div
                                className={[Styles.tag, filteringOption === '' && Styles.chosen]
                                    .filter(Boolean)
                                    .join(' ')}
                                key='zero'
                                onClick={() => setFilteringOption('')}
                            >
                                Всі
                            </div>,
                            ...Object.entries(statuses).map(([key, value], index) => (
                                <div
                                    className={[
                                        Styles.tag,
                                        filteringOption === key && Styles.chosen,
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    key={index}
                                    onClick={() => setFilteringOption(key)}
                                >
                                    {value}
                                </div>
                            )),
                        ]}
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
