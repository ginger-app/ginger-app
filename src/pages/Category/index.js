// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { PageTitle } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { marketActions } from 'bus/market/actions';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    getMarketCategoryDataAsync: marketActions.getMarketCategoryDataAsync,
};

const CategoryComponent = ({ className, sku }) => (
    <Transition in appear mountOnEnter unmountOnExit timeout={opacityTransitionConfig().timeout}>
        {(state) => (
            <section
                className={Styles.container}
                style={{
                    ...opacityTransitionConfig().defaultStyles,
                    ...opacityTransitionConfig().transitionStyles[state],
                }}
            >
                <PageTitle className={Styles.title} title={sku} />
                {sku}
            </section>
        )}
    </Transition>
);

export const CategoryPage = connect(mapStateToProps, mapDispatchToProps)(CategoryComponent);
