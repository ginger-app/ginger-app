// Core
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Navigation, OrderCombination } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    orderCombinationsOverlay: state.ui.orderCombinationsOverlay,
    orderCombinations: state.ui.orderCombinations,
});

const mapDispatchToProps = {
    hideOrderCombinationsOverlay: uiActions.hideOrderCombinationsOverlay,
};

type OrderCombinationsPropsTypes = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & { className: string };

const OrderCombinationsComponent: FC<OrderCombinationsPropsTypes> = ({
    className,
    orderCombinationsOverlay,
    orderCombinations,
    hideOrderCombinationsOverlay,
}) => {
    return (
        <Transition
            in={orderCombinationsOverlay}
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
