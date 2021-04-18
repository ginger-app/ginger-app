// Core
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, SupplierOrderItem, Carousel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';
import { useSupplier } from 'domains/supplier/hooks';
import { useAuth } from 'domains/auth/hooks';

const mapDispatchToProps = {
    showLoginOverlay: uiActions.showLoginOverlay,
    showOrdersFiltersOverlay: uiActions.showOrdersFiltersOverlay,
    getSupplierOrdersAsync: profileActions.getSupplierOrdersAsync,
};

type OrdersComponentProps = {
    showLoginOverlay: (backButtonPath: string) => void;
    showOrdersFiltersOverlay: () => void;
    getSupplierOrdersAsync: () => void;
};

const OrdersComponent: FC<OrdersComponentProps> = ({
    showLoginOverlay,
    showOrdersFiltersOverlay,
    getSupplierOrdersAsync,
}) => {
    const [filterValue, setFilterValue] = useState('Всі');
    const { orders } = useSupplier();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            showLoginOverlay('/');
        } else {
            getSupplierOrdersAsync();
        }
    }, [isAuthenticated, showLoginOverlay, getSupplierOrdersAsync]);

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
                        {orders
                            .filter((item) => filterValue === 'Всі' || item.status === filterValue)
                            .map((item, index) => (
                                // @ts-ignore
                                <SupplierOrderItem {...item} key={index} index={index} />
                            ))}
                    </div>

                    {/* Fast sorting options */}
                    {/* @ts-ignore */}
                    <Carousel
                        className={Styles.tags}
                        carouselClassName={Styles.carousele}
                        items={['Всі', ...Object.keys(statusesImportance)].map((item, index) => (
                            <div
                                className={[Styles.tag, filterValue === item && Styles.chosen]
                                    .filter(Boolean)
                                    .join(' ')}
                                key={index}
                                onClick={() => setFilterValue(item)}
                            >
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

export const SupplierOrdersPage = connect(null, mapDispatchToProps)(OrdersComponent);
