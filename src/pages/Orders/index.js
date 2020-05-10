// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { PageTitle, MarketShowcase, Carousel } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';

const mapStateToProps = (state) => ({
    orders: state.profile.get('orders'),
});

const mapDispatchToProps = {};

const OrdersComponent = ({ className, orders }) => {
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
                    <PageTitle className={Styles.title} title={'Orders'} />
                    <Carousel
                        itemsToShow={2}
                        className={Styles.tags}
                        items={['Completed', 'In progress', 'Cancelled'].map((item, index) => (
                            <div className={Styles.tag} key={index}>
                                {item}
                            </div>
                        ))}
                    />
                    <MarketShowcase className={Styles.showcase} items={orders} orderType />
                </section>
            )}
        </Transition>
    );
};

export const OrdersPage = connect(mapStateToProps, mapDispatchToProps)(OrdersComponent);
