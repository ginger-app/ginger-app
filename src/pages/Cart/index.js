// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { Navigation, Button, GradientBorder, CartItem } from 'components';
import mockImage from 'theme/assets/images/apples-mock.png';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const CartComponent = ({ className }) => {
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
                    <div className={Styles.deliveryDate}>Choose delivery date</div>

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
                                name='Test item'
                                image={mockImage}
                                price={43.99}
                                amount={102}
                                unit='kg'
                                removeItem={() => null}
                                orderDetails
                            />
                        ))}
                    </div>

                    {/* Footer navigation */}
                    <Navigation
                        centerButton={<Button text='Payment' filled />}
                        rightButtonData={{ icon: 'trash', onClick: () => null }}
                        dark
                    />
                </section>
            )}
        </Transition>
    );
};

export const CartPage = connect(mapStateToProps, mapDispatchToProps)(CartComponent);
