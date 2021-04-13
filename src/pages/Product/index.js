// Core
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, AddItemToLocation, Navigation } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import isEmpty from 'lodash/isEmpty';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    productData: state.market.get('productData').toJS(),
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
    getProductDataAsync: marketActions.getProductDataAsync,
    clearProductData: marketActions.clearProductData,
    showMarketFiltersOverlay: uiActions.showMarketFiltersOverlay,
    showLoginOverlay: uiActions.showLoginOverlay,
};

const ProductComponent = ({
    id,
    productData,
    getProductDataAsync,
    clearProductData,
    showLoginOverlay,
    isAuthenticated,
}) => {
    const [locationsPopup, setLocationsPopupState] = useState(false);

    useEffect(() => {
        getProductDataAsync(id);

        return clearProductData;
    }, [id, getProductDataAsync, clearProductData]);

    const { image, name, unit, maxPrice, minPrice } = productData;

    return (
        <section className={Styles.container}>
            <Transition
                in={!isEmpty(productData)}
                appear
                mountOnEnter
                unmountOnExit
                timeout={opacityTransitionConfig().timeout}
            >
                {(state) => (
                    <div
                        className={Styles.card}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[state],
                        }}
                    >
                        <img src={image} alt='' className={Styles.itemImage} />

                        <p className={Styles.subtitle}>Найменування</p>
                        <p className={Styles.itemName}>{name}</p>

                        <p className={Styles.subtitle}>Фасовка</p>
                        <p className={Styles.unit}>{unit}</p>

                        <p className={Styles.subtitle}>Ціна, грн</p>
                        <p className={Styles.price}>
                            {minPrice.toFixed(2)}-{maxPrice.toFixed(2)}
                        </p>

                        {/* Overlays */}
                        <AddItemToLocation
                            productId={id}
                            inProp={locationsPopup}
                            hidePopup={() => setLocationsPopupState(false)}
                        />
                    </div>
                )}
            </Transition>

            <Navigation
                centerButton={
                    <Button
                        text='Додати до локації'
                        className={Styles.addToLocationButton}
                        onClick={() =>
                            isAuthenticated ? setLocationsPopupState(true) : showLoginOverlay()
                        }
                        filled
                    />
                }
                rightButtonData={{
                    icon: 'trash',
                    onClick: () =>
                        isAuthenticated ? setLocationsPopupState(true) : showLoginOverlay(),
                }}
            />
        </section>
    );
};

export const ProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductComponent);
