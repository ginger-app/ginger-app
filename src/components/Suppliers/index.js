// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { RadioButton } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    chosenSupplierData: state.profile.get('chosenSupplierData'),
});

const mapDispatchToProps = {
    setChosenSupplierData: profileActions.setChosenSupplierData,
};

const SuppliersComponent = ({
    className,
    chosenSupplierData,
    setChosenSupplierData,
    productData: { _id: productId, suppliers, unit },
}) => {
    return (
        <section className={[Styles.container, className].filter(Boolean).join(' ')}>
            {suppliers &&
                suppliers.map((supplierData, index) => {
                    const { conditions, name, itemsList, _id } = supplierData;
                    const { price } = itemsList.find(({ _id: id }) => productId === id);

                    return (
                        <Transition
                            in
                            appear
                            mountOnEnter
                            unmountOnExit
                            timeout={opacityTransitionConfig(700 + index * 50).timeout}
                            key={index}
                        >
                            {(state) => (
                                <div
                                    className={Styles.supplier}
                                    style={{
                                        ...opacityTransitionConfig(700).defaultStyles,
                                        ...opacityTransitionConfig(700).transitionStyles[state],
                                    }}
                                >
                                    {/* Left side */}
                                    <p className={Styles.name}>{name}</p>
                                    <p className={Styles.priceSubtitle}>Price:</p>
                                    <p className={Styles.price}>{price} грн.</p>

                                    {/* Unit */}
                                    <p className={Styles.unit}>{unit}</p>

                                    {/* Right side */}
                                    {/* <div className={Styles.rating}>{rating}</div> */}
                                    <p className={Styles.conditionsSubtitle}>Умови поставки:</p>
                                    <div className={Styles.conditions}>
                                        {conditions.map((condition, key) => (
                                            <p key={key}>{condition}</p>
                                        ))}
                                    </div>

                                    {/* Radio selector */}
                                    <RadioButton
                                        className={Styles.radioButton}
                                        selected={_id === chosenSupplierData._id}
                                        onChange={() => setChosenSupplierData(supplierData)}
                                    />
                                </div>
                            )}
                        </Transition>
                    );
                })}
        </section>
    );
};

export const Suppliers = connect(mapStateToProps, mapDispatchToProps)(SuppliersComponent);
