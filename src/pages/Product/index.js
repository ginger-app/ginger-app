// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { ProductDetails, Navigation, Suppliers } from 'components';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    productData: state.market.get('productData').toJS(),
});

const mapDispatchToProps = {
    getProductDataAsync: marketActions.getProductDataAsync,
    clearProductData: marketActions.clearProductData,
    showMarketFiltersOverlay: uiActions.showMarketFiltersOverlay,
};

const ProductComponent = ({
    sku,
    productData,
    getProductDataAsync,
    clearProductData,
    showMarketFiltersOverlay,
}) => {
    useEffect(() => {
        getProductDataAsync(sku);

        return clearProductData;
    }, [sku, getProductDataAsync, clearProductData]);

    // console.log(productData);

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
                    <ProductDetails productData={productData} />
                    <Suppliers suppliers={productData.suppliers} />
                    <Navigation
                        search
                        rightButtonData={{
                            onClick: showMarketFiltersOverlay,
                            icon: 'filters',
                        }}
                    />
                </section>
            )}
        </Transition>
    );
};

export const ProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
