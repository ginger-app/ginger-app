// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, OrderCombination } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    orderCombinationsOverlay: state.ui.get('orderCombinationsOverlay'),
    orderCombinations: state.ui.get('orderCombinations'),
});

const mapDispatchToProps = {
    hideOrderCombinationsOverlay: uiActions.hideOrderCombinationsOverlay,
};

const OrderCombinationsComponent = ({
    className,
    orderCombinationsOverlay,
    orderCombinations,
    hideOrderCombinationsOverlay,
}) => {
    return (
        <Transition
            in={orderCombinationsOverlay}
            // in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <Portal>
                    <section
                        className={[Styles.container, className].filter(Boolean).join(' ')}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[state],
                        }}
                    >
                        <p className={Styles.title}>Пропозиції</p>
                        {orderCombinations.map((item, index) => (
                            <OrderCombination key={index} index={index} {...item} />
                        ))}

                        <Navigation backButtonAction={hideOrderCombinationsOverlay} />
                    </section>
                </Portal>
            )}
        </Transition>
    );
};

export const OrderCombinations = connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrderCombinationsComponent);
