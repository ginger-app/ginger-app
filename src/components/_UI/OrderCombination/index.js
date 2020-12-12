// Core
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { OrderCombinationDetails } from 'components';
import { leftToRightSlideConfig } from 'utils/transitionConfig';
import logo from 'theme/assets/svg/logo.svg';
import arrow from 'theme/assets/svg/right-full-arrow.svg';

const images = {
    'Least suppliers': logo,
};

export const OrderCombination = ({ className, index, name, orders, sum }) => {
    const [combinationDetails, setCombinationDetailsState] = useState(false);

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={leftToRightSlideConfig((index + 2) * 100).timeout}
        >
            {(state) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    onClick={() => setCombinationDetailsState(true)}
                    style={{
                        ...leftToRightSlideConfig(100).defaultStyles,
                        ...leftToRightSlideConfig().transitionStyles[state],
                        transition: 'all 0.2s',
                    }}
                >
                    <img className={Styles.image} src={images[name]} alt='' />

                    <div className={Styles.devider} />

                    <p className={Styles.sumTitle}>Загальний чек, грн</p>
                    <p className={Styles.sum}>{sum.toFixed(2)}</p>
                    <p className={Styles.suppliers}>Постачальників: {orders.length}</p>

                    <img className={Styles.arrowButton} src={arrow} alt='' />

                    {/* Overlays */}
                    <OrderCombinationDetails
                        inProp={combinationDetails}
                        close={() => setCombinationDetailsState(false)}
                        sum={sum}
                        orders={orders}
                        image={images[name]}
                    />
                </section>
            )}
        </Transition>
    );
};
