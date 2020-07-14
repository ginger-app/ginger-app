// Core
import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles

// Components
import { PageTitle, MarketShowcase } from 'components';

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

    const statusesImportance = {
        Pending: 1,
        Shipping: 2,
        'Awaiting shipment': 3,
        'Awaiting collection': 4,
        Completed: 5,
        Cancelled: 6,
    };

    const inProgressFirst = (a, b) => statusesImportance[a.status] - statusesImportance[b.status];

    const getSortedOrders = useCallback(() => orders.sort(inProgressFirst), [orders]);

    // const [filterParameter, setFilterParameter] = useState('All');
    // const possibleFilters = {
    //     Pending: 'До сплати',
    //     Completed: 'Завершені',
    //     Shipping: 'Вже їдуть',
    //     'Awaiting collection': 'Збираються',
    //     'Awaiting shipment': 'Вже на виході',
    //     Cancelled: 'Відмінені :(',
    //     All: 'Всі',
    // };

    // const filteredOrders =
    //     filterParameter === 'All'
    //         ? orders
    //         : orders.filter(({ status }) => status === filterParameter);

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
                    <MarketShowcase
                        className={Styles.showcase}
                        items={getSortedOrders()}
                        orderType
                    />
                </section>
            )}
        </Transition>
    );
};

export const OrdersPage = connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);
