// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { PageTitle, MarketShowcase } from 'components';

// Instruments
import Carousel from 'react-elastic-carousel';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { isEmpty } from 'lodash';

// Actions
import { marketActions } from 'bus/market/actions';

const mapStateToProps = (state) => ({
    subcategoryData: state.market.get('subcategoryData').toJS(),
});

const mapDispatchToProps = {
    getMarketSubcategoryDataAsync: marketActions.getMarketSubcategoryDataAsync,
};

const SubcategoryComponent = ({
    className,
    sku,
    getMarketSubcategoryDataAsync,
    subcategoryData,
}) => {
    useEffect(() => {
        getMarketSubcategoryDataAsync(sku);
    }, [getMarketSubcategoryDataAsync, sku]);

    const { name } = subcategoryData;

    return isEmpty(subcategoryData) ? (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => {
                console.log('Loading state -> ', state);
                return (
                    <section
                        className={Styles.loadingContainer}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[state],
                        }}
                    >
                        Loading subcategory...
                    </section>
                );
            }}
        </Transition>
    ) : (
        <Transition
            in
            appear={!isEmpty(subcategoryData)}
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => {
                console.log('Data state -> ', state);
                return (
                    <section
                        className={Styles.container}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[state],
                        }}
                    >
                        <PageTitle className={Styles.title} title={name} />
                        <Carousel
                            className={Styles.tags}
                            itemsToShow={3}
                            itemsToScroll={2}
                            showArrows={false}
                            pagination={false}
                            itemPadding={[0, 2, 0, 2]}
                            enableTilt
                            enableMouseSwipe
                        >
                            <div className={Styles.tag}>TagName</div>
                            <div className={Styles.tag}>TagName</div>
                            <div className={Styles.tag}>TagName</div>
                        </Carousel>
                        <MarketShowcase className={Styles.showcase} items={[]} />
                    </section>
                );
            }}
        </Transition>
    );
};

export const SubcategoryPage = connect(mapStateToProps, mapDispatchToProps)(SubcategoryComponent);
