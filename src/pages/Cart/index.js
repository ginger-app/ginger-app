// Core
import React, { useState } from 'react';
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
    OrderSuccessModal,
    Dummy,
} from 'components';
import mockImage from 'theme/assets/images/apples-mock.png';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const CartComponent = ({ className }) => {
    const [showDateOverlay, setDateOverlayState] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState(null);
    const [orderSuccessModal, setOrderSuccessModalState] = useState(false);

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
                            <p className={Styles.data}>Froma.coffee</p>

                            <p className={Styles.subtitle}>Address:</p>
                            <p className={Styles.data}>вул. Хрещатик, 1</p>
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
                    <GradientBorder className={Styles.orderSumContainer}>
                        <div className={Styles.orderSum}>
                            <span>Order total:</span>
                            <span className={Styles.price}>{42.23} грн.</span>
                        </div>
                    </GradientBorder>
                    <div className={Styles.itemsList}>
                        {new Array(10).fill(1).map((item, index) => (
                            <CartItem
                                key={index}
                                name='Test item with some very long name that doesnt fitw'
                                image={mockImage}
                                price={43.99}
                                amount={10000}
                                unit='kg'
                                removeItem={() => null}
                                orderDetails
                            />
                        ))}
                        <Dummy className={Styles.dummy} />
                    </div>

                    {/* Footer navigation */}
                    <Navigation
                        centerButton={
                            <Button
                                text={deliveryDate ? 'Payment' : 'Choose date'}
                                onClick={() =>
                                    deliveryDate
                                        ? setOrderSuccessModalState(true)
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
                    <OrderSuccessModal inProp={orderSuccessModal} />
                </section>
            )}
        </Transition>
    );
};

export const CartPage = connect(mapStateToProps, mapDispatchToProps)(CartComponent);
