// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { Button, RadioButton, Icon } from 'components';
import mockApples from 'theme/assets/images/apples-mock.png';

// Actions

// Mocks
const locations = [
    'Montgolfiere',
    'Forma.coffee',
    'Blur',
    'Whitebeard Blackbird',
    'Yellow Coffee',
    'OH MY',
    'Fair Finch',
    'Veterano Coffee',
];

const mapStateToProps = (state) => ({
    productData: state.market.get('productData').toJS(),
    cart: state.profile.get('cart'),
    backButtonPath: state.ui.get('backButtonPath'),
});

const mapDispatchToProps = {};

const ProductDetailsComponent = ({
    className,
    // sku,
    productData,
}) => {
    // const { nameUkr, stock, unit, price, image } = productData;

    const { nameUkr, price, unit } = productData;
    const [expanded, setExpandedState] = useState(false);
    const [locationsData, setLocationsData] = useState({});
    const [locationsAdded, setLocationsAddedAmount] = useState(0);

    useEffect(() => {
        const data = {};
        locations.forEach((item) => {
            data[item] = false;
        });

        setLocationsData(data);
    }, []);

    const calculateLocationsHeight = () => `${locations.length * 4 + 1}rem`;

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
                    <img src={mockApples} className={Styles.image} alt='' />
                    <p className={Styles.itemName}>{nameUkr}</p>
                    <div className={Styles.price}>
                        <span>{price} грн.</span>
                        <span className={Styles.unit}>{unit}</span>
                    </div>

                    {/* Devider */}
                    <div className={Styles.devider} />

                    {/* Right side */}
                    <p className={Styles.supplierSubtitle}>Постачальник</p>
                    <p className={Styles.supplierName}>Galychyna</p>
                    <div className={Styles.ranking} />
                    <div className={Styles.deliveryConditions}>
                        <p className={Styles.title}>Умови поставки</p>
                        <p className={Styles.item}>День в день</p>
                        <p className={Styles.item}>Мін. замовлення 900₴</p>
                    </div>

                    {/* Locations list */}
                    <div
                        className={Styles.locations}
                        style={{
                            height: expanded ? calculateLocationsHeight() : '0',
                            opacity: expanded ? '1' : '0',
                        }}
                    >
                        {locations.map((item, index) => (
                            <div className={Styles.location} key={index}>
                                <p>{item}</p>
                                <RadioButton
                                    className={Styles.radio}
                                    selected={!!locationsData[item]}
                                    onChange={() => {
                                        setLocationsAddedAmount(
                                            !locationsData[item]
                                                ? locationsAdded + 1
                                                : locationsAdded - 1,
                                        );
                                        setLocationsData({
                                            ...locationsData,
                                            [item]: !locationsData[item],
                                        });
                                    }}
                                />
                            </div>
                        ))}

                        {/* Adding a new location button */}
                        <div className={Styles.newLocation}>
                            New location
                            <Button
                                className={Styles.newLocationButton}
                                content={<Icon name='plus' color='white' />}
                                filled
                            />
                        </div>
                    </div>

                    <Button
                        className={Styles.actionButton}
                        onClick={() => setExpandedState(!expanded)}
                        text={
                            locationsAdded
                                ? `Додано локацій - ${locationsAdded}`
                                : 'Додати в список'
                        }
                        filled
                    />
                </section>
            )}
        </Transition>
    );
};

export const ProductDetails = connect(mapStateToProps, mapDispatchToProps)(ProductDetailsComponent);
