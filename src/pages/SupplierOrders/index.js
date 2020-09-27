// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, Carousel, SupplierOrderItem, Dummy } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';

const filters = ['All', 'New', 'In Progress', 'Finished', 'Cancelled'];

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    showMarketFiltersOverlay: uiActions.showMarketFiltersOverlay,
};

const SupplierOrdersComponent = ({ showMarketFiltersOverlay }) => {
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
                    <p className={Styles.title}>Supplier orders</p>

                    {/* Content */}
                    <div className={Styles.orders}>
                        {new Array(20).fill(1).map((item, index) => (
                            <SupplierOrderItem className={Styles.orderItem} key={index} />
                        ))}
                        <Dummy />
                        <Dummy />
                    </div>

                    {/* Footer navigation */}
                    <Carousel
                        itemsToShow={2}
                        className={Styles.tags}
                        carouselClassName={Styles.carousele}
                        items={filters.map((item, index) => (
                            <div className={Styles.tag} key={index}>
                                {item}
                            </div>
                        ))}
                    />
                    <Navigation
                        rightButtonData={{
                            icon: 'filters',
                            onClick: showMarketFiltersOverlay,
                        }}
                    />
                </section>
            )}
        </Transition>
    );
};

export const SupplierOrdersPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierOrdersComponent);
