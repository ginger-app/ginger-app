// Core
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles

// Components
import { PageTitle, MarketShowcase, Carousel } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';
import Styles from './styles.module.scss';

const mapStateToProps = (state) => ({
    orders: state.profile.get('orders'),
    isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = {
    showLoginOverlay: uiActions.showLoginOverlay,
};

const OrdersComponent = ({ orders, isAuthenticated, showLoginOverlay }) => {
    useEffect(() => {
        if (!isAuthenticated) {
            showLoginOverlay('/');
        }
    }, [isAuthenticated, showLoginOverlay]);

    const [filterParameter, setFilterParameter] = useState('All');
    const possibleFilters = {
        Pending: 'До сплати',
        Completed: 'Завершені',
        Shipping: 'Вже їдуть',
        'Awaiting collection': 'Збираються',
        'Awaiting shipment': 'Вже на виході',
        Cancelled: 'Відмінені :(',
        All: 'Всі',
    };

    const filteredOrders =
        filterParameter === 'All'
            ? orders
            : orders.filter(({ status }) => status === filterParameter);

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
                    <PageTitle className={Styles.title} title='Orders' />
                    <Carousel
                        itemsToShow={2}
                        className={Styles.tags}
                        items={Object.keys(possibleFilters).map((item, index) => (
                            <div
                                className={Styles.tag}
                                onClick={() => setFilterParameter(item)}
                                key={index}
                            >
                                {possibleFilters[item]}
                            </div>
                        ))}
                    />
                    <MarketShowcase className={Styles.showcase} items={filteredOrders} orderType />
                </section>
            )}
        </Transition>
    );
};

export const OrdersPage = connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);
