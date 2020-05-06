// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Components
import { ProductData } from 'components';

// Instruments
import { isEmpty } from 'lodash';
import { TraceSpinner } from 'react-spinners-kit';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { marketActions } from 'bus/market/actions';

const mapStateToProps = (state) => ({
    productData: state.market.get('productData').toJS(),
});

const mapDispatchToProps = {
    getProductDataAsync: marketActions.getProductDataAsync,
    clearProductData: marketActions.clearProductData,
};

const ProductComponent = ({ sku, productData, getProductDataAsync, clearProductData }) => {
    useEffect(() => {
        getProductDataAsync(sku);

        return clearProductData;
    }, []);
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
                    className={Styles.bg}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    {isEmpty(productData) ? (
                        <TraceSpinner color='white' size={50} />
                    ) : (
                        <ProductData sku={sku} />
                    )}
                </section>
            )}
        </Transition>
    );
};

export const ProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
