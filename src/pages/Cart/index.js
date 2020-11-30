// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { Navigation, Button, GradientBorder, CartItem, ChooseDateOverlay, Dummy } from 'components';

// Actions
import { profileActions } from 'bus/profile/actions';

// Test
import { Api } from 'api';

const mapStateToProps = (state) => ({
    locations: state.profile.get('locations'),
});

const mapDispatchToProps = {
    createNewOrderAsync: profileActions.createNewOrderAsync,
};

const CartComponent = ({
    className,
    locationId,
    locations,
    // createNewOrderAsync
}) => {
    const [showDateOverlay, setDateOverlayState] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState(null);

    const [locationData, setLocationData] = useState({});
    const [orderData, setOrderData] = useState([]);
    const [itemQuantities, setItemQuantities] = useState({});

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
        }
    }, [locationId, locations]);

    const cartIsEmpty = !orderData.some((item) => itemQuantities[item._id]);

    const testGetOrdersOffers = async () => {
        const order = {
            items: orderData.filter(
                (item) =>
                    itemQuantities[item._id] && {
                        ...item,
                        amount: itemQuantities[item._id],
                    },
            ),
            location: locationId,
            deliveryDate: deliveryDate.utc().format(),
        };

        const response = await Api.orders.getOrdersOffers(order);
        const result = await response.json();

        // console.log(order);
        console.log(result);
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
                        {deliveryDate
                            ? deliveryDate
                                  .format(`dddd, DD MMMM YYYY`)
                                  .split(',')
                                  .map((item, index) => <p key={index}>{item}</p>)
                            : 'Choose delivery date'}
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
                                    deliveryDate && !cartIsEmpty
                                        ? 'Показати варіанти'
                                        : cartIsEmpty
                                        ? 'Choose items'
                                        : 'Choose delivery date'
                                }
                                onClick={() =>
                                    deliveryDate && !cartIsEmpty
                                        ? testGetOrdersOffers()
                                        : cartIsEmpty
                                        ? null
                                        : setDateOverlayState(true)
                                }
                                filled
                            />
                        }
                        rightButtonData={{
                            icon: 'trash',
                            onClick: () => null,
                        }}
                        dark
                    />

                    {/* Overlay */}
                    <ChooseDateOverlay
                        inProp={showDateOverlay}
                        close={() => setDateOverlayState(false)}
                        setDate={setDeliveryDate}
                    />
                </section>
            )}
        </Transition>
    );
};

export const CartPage = connect(mapStateToProps, mapDispatchToProps)(CartComponent);
