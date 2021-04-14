// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { DoubleRowCarousel, Button, Icon } from 'components';
import { topToBottomSlideConfig } from 'utils/transitionConfig';
import randomWords from 'random-words';

// Actions
import { uiActions } from 'bus/ui/actions';
import { Dummy } from 'components/_UI';

// Mocks
const suppliers = randomWords({
    exactly: 15,
    wordsPerString: 3,
    formatter: (word) => (Math.random() > 0.5 ? word : ''),
}).map((item) => (item.trim().length === 0 ? 'Galychyna' : item));

const mapStateToProps = (state) => ({
    ordersFiltersOverlay: state.ui.ordersFiltersOverlay,
});

const mapDispatchToProps = {
    hideOrdersFiltersOverlay: uiActions.hideOrdersFiltersOverlay,
};

const OrderFiltersOverlayComponent = ({
    className,
    ordersFiltersOverlay,
    hideOrdersFiltersOverlay,
}) => {
    return (
        <Transition
            in={ordersFiltersOverlay}
            appear
            mountOnEnter
            unmountOnExit
            timeout={topToBottomSlideConfig().timeout}
        >
            {(state) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...topToBottomSlideConfig().defaultStyles,
                        ...topToBottomSlideConfig().transitionStyles[state],
                    }}
                >
                    {/* Title */}
                    <p className={Styles.title}>Filters</p>

                    {/* Filters */}
                    <p className={Styles.subtitle}>Supplier</p>
                    <p className={Styles.clear}>Очистити</p>
                    <DoubleRowCarousel items={['All', ...suppliers]} className={Styles.slider} />

                    <p className={Styles.subtitle}>Location</p>
                    <p className={Styles.clear}>Очистити</p>
                    <DoubleRowCarousel items={['All', ...suppliers]} className={Styles.slider} />

                    <p className={Styles.subtitle}>Category</p>
                    <p className={Styles.clear}>Очистити</p>
                    <DoubleRowCarousel items={['All', ...suppliers]} className={Styles.slider} />

                    {/* Apply button */}
                    <Button
                        className={Styles.applyButton}
                        content={<Icon name='check' color='white' className={Styles.icon} />}
                        onClick={hideOrdersFiltersOverlay}
                        filled
                    />
                    <Dummy className={Styles.dummy} />
                </section>
            )}
        </Transition>
    );
};

export const OrderFiltersOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderFiltersOverlayComponent);
