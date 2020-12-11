// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import {
    Navigation,
    Button,
    GradientBorder,
    CartItem,
    ChooseDateOverlay,
    OrderCombinations,
    Dummy,
} from 'components';

// Actions
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    locations: state.profile.get('locations'),
});

const mapDispatchToProps = {
    createNewOrderAsync: profileActions.createNewOrderAsync,
    getOrdersCombinationsAsync: profileActions.getOrdersCombinationsAsync,
};

const CartComponent = ({
    className,
    locationId,
    locations,
    getOrdersCombinationsAsync,
    // createNewOrderAsync
}) => {
    const [showDateOverlay, setDateOverlayState] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState({});

    const [locationData, setLocationData] = useState({});
    const [orderData, setOrderData] = useState([]);
    const [itemQuantities, setItemQuantities] = useState({});
    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        const filteredLocation = locations.find(({ _id }) => _id === locationId);

        if (filteredLocation) {
            const initialItemQuantities = {};

            const initialOrderData = filteredLocation.itemsList.map((item) => {
                initialItemQuantities[item._id] = 0;

                return item;
            });

            setLocationData(filteredLocation);
            setOrderData(initialOrderData);
            setItemQuantities(initialItemQuantities);
            setInitialData(initialItemQuantities);
        }
    }, [locationId, locations]);

    const cartIsEmpty = !orderData.some((item) => itemQuantities[item._id]);

    const handleSubmit = () => {
        if (!deliveryDate.string) return setDateOverlayState(true);
        if (cartIsEmpty) return null;

        const itemsObj = {};

        orderData.forEach((item) => {
            if (itemQuantities[item._id]) {
                itemsObj[item._id] = {
                    ...item,
                    requestedAmount: itemQuantities[item._id],
                };
            }
        });

        getOrdersCombinationsAsync({
            items: itemsObj,
            location: locationId,
            deliveryDate: deliveryDate.utc,
        });
    };

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
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    {/* Location and delivery time */}
                    <GradientBorder>
                        <div className={Styles.locationData}>
                            <p className={Styles.subtitle}>Location:</p>
                            <p className={Styles.data}>{locationData.locationName}</p>

                            <p className={Styles.subtitle}>Address:</p>
                            <p className={Styles.data}>{locationData.address}</p>
                        </div>
                    </GradientBorder>
                    <div className={Styles.deliveryDate} onClick={() => setDateOverlayState(true)}>
                        {deliveryDate.string || 'Choose delivery date'}
                    </div>

                    {/* Order details */}
                    <div className={Styles.itemsList}>
                        {orderData.map(({ name, image, minPrice, unit, _id }, index) => (
                            <CartItem
                                key={index}
                                name={name}
                                image={image}
                                minPrice={minPrice}
                                quantity={itemQuantities[_id]}
                                unit={unit}
                                incrementQty={() => {
                                    setItemQuantities({
                                        ...itemQuantities,
                                        [_id]: itemQuantities[_id] + 1,
                                    });
                                }}
                                decrementQty={() => {
                                    if (itemQuantities[_id] > 0) {
                                        setItemQuantities({
                                            ...itemQuantities,
                                            [_id]: itemQuantities[_id] - 1,
                                        });
                                    }
                                }}
                                orderDetails
                            />
                        ))}
                        <Dummy className={Styles.dummy} />
                    </div>

                    {/* Footer navigation */}
                    <Navigation
                        centerButton={
                            <Button
                                text={
                                    deliveryDate.string && !cartIsEmpty
                                        ? 'Показати варіанти'
                                        : cartIsEmpty
                                        ? 'Choose items'
                                        : 'Choose delivery date'
                                }
                                onClick={handleSubmit}
                                filled
                            />
                        }
                        rightButtonData={{
                            icon: 'trash',
                            onClick: () => setItemQuantities(initialData),
                        }}
                        dark
                    />

                    {/* Overlay */}
                    <ChooseDateOverlay
                        inProp={showDateOverlay}
                        close={() => setDateOverlayState(false)}
                        setDate={setDeliveryDate}
                    />
                    <OrderCombinations />
                </section>
            )}
        </Transition>
    );
};

export const CartPage = connect(mapStateToProps, mapDispatchToProps)(CartComponent);
