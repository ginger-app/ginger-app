// Core
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { RadioButton } from 'components';

// Mocks
import { mockSuppliers } from './mocks';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const SuppliersComponent = ({ className }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        setData(mockSuppliers);
    }, []);

    return (
        <section className={[Styles.container, className].filter(Boolean).join(' ')}>
            {Object.keys(data).map((item, index) => {
                const { rating, price, conditions, selected, unit } = data[item];

                return (
                    <div className={Styles.supplier} key={index}>
                        {/* Left side */}
                        <p className={Styles.name}>{item}</p>
                        <p className={Styles.priceSubtitle}>Price:</p>
                        <p className={Styles.price}>{price} грн.</p>

                        {/* Unit */}
                        <p className={Styles.unit}>{unit}</p>

                        {/* Right side */}
                        <div className={Styles.rating}>{rating}</div>
                        <p className={Styles.conditionsSubtitle}>Умови поставки:</p>
                        <div className={Styles.conditions}>
                            {conditions.map((condition, key) => (
                                <p key={key}>{condition}</p>
                            ))}
                        </div>

                        {/* Radio selector */}
                        <RadioButton
                            className={Styles.radioButton}
                            selected={selected}
                            // Mock
                            onChange={() =>
                                setData({
                                    ...data,
                                    [item]: {
                                        ...data[item],
                                        selected: !selected,
                                    },
                                })
                            }
                        />
                    </div>
                );
            })}
        </section>
    );
};

export const Suppliers = connect(mapStateToProps, mapDispatchToProps)(SuppliersComponent);
