// Core
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, RadioButton, Icon } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import isEmpty from 'lodash/isEmpty';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    productData: state.market.get('productData').toJS(),
    locations: state.profile.get('locations'),
    backButtonPath: state.ui.get('backButtonPath'),
    chosenSupplierData: state.profile.get('chosenSupplierData'),
    marketItemChosenLocations: state.profile.get('marketItemChosenLocations'),
});

const mapDispatchToProps = {
    showNewLocationOverlay: uiActions.showNewLocationOverlay,
    addNewItemToLocationAsync: profileActions.addNewItemToLocationAsync,
};

const ProductDetailsComponent = ({
    className,
    productData,
    showNewLocationOverlay,
    addNewItemToLocationAsync,
    locations,
    chosenSupplierData,
    marketItemChosenLocations,
}) => {
    const { name, image, minPrice, maxPrice, unit, _id: productId } = productData;
    const { name: chosenSupplierName, _id: supplierId, conditions } = chosenSupplierData;

    const [expanded, setExpandedState] = useState(false);
    const supplierChosen = !isEmpty(chosenSupplierData);

    const calculateLocationsHeight = () => `${locations.length * 3 + 0.5}rem`;

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig(700).timeout}
        >
            {(state) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...opacityTransitionConfig(700).defaultStyles,
                        ...opacityTransitionConfig(700).transitionStyles[state],
                        transition: `all 0.3s`,
                    }}
                >
                    {/* Left side */}
                    <img src={image} className={Styles.image} alt='' />
                    <p className={Styles.itemName}>{name}</p>
                    <div className={Styles.price}>
                        <span>
                            {minPrice} - {maxPrice} грн.
                        </span>
                        <span className={Styles.unit}>{unit}</span>
                    </div>

                    {/* Devider */}
                    <div className={Styles.devider} />

                    {/* Right side */}
                    <p className={Styles.supplierSubtitle}>Постачальник</p>
                    <p className={Styles.supplierName}>
                        {supplierChosen ? chosenSupplierName : 'Not chosen'}
                    </p>

                    {supplierChosen ? (
                        <div className={Styles.deliveryConditions}>
                            <p className={Styles.title}>Умови поставки</p>
                            {conditions.map((item, index) => (
                                <p className={Styles.item} key={index}>
                                    {item}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <div className={Styles.supplierNotChosenHint}>
                            Choose a supplier from the list below and then choose locations from a
                            dropdown
                        </div>
                    )}

                    {/* Locations list */}
                    <div
                        className={Styles.locations}
                        style={{
                            height: expanded ? calculateLocationsHeight() : '0',
                            opacity: expanded ? '1' : '0',
                        }}
                    >
                        {marketItemChosenLocations.map(({ locationName, _id, chosen }, index) => (
                            <div className={Styles.location} key={index}>
                                <p>{locationName}</p>
                                <RadioButton
                                    className={Styles.radio}
                                    selected={chosen}
                                    onChange={() =>
                                        addNewItemToLocationAsync({
                                            locationId: _id,
                                            itemId: productId,
                                            supplierId,
                                        })
                                    }
                                />
                            </div>
                        ))}

                        {/* Adding a new location button */}
                        <div className={Styles.newLocation}>
                            New location
                            <Button
                                className={Styles.newLocationButton}
                                content={<Icon name='plus' color='white' />}
                                onClick={showNewLocationOverlay}
                                filled
                            />
                        </div>
                    </div>

                    <Button
                        className={Styles.actionButton}
                        onClick={() => setExpandedState(!expanded)}
                        text='Локації'
                        filled
                    />
                </section>
            )}
        </Transition>
    );
};

export const ProductDetails = connect(mapStateToProps, mapDispatchToProps)(ProductDetailsComponent);
