// Core
import React, { useState, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { Portal } from 'react-portal';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { profileActions } from 'bus/profile/profile.actions';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    updateItemFromPreviewAsync: profileActions.updateItemFromPreviewAsync,
};

const SupplierItemEditingPopupComponent = ({
    defaultName,
    defaultUnit,
    defaultPrice,
    defaultStock,
    defaultCategory,
    defaultImage,
    inProp,
    closePopup,
    updateItemFromPreviewAsync,
    itemIndex,
}) => {
    // Refs
    const nameRef = useRef(null);
    const categoryRef = useRef(null);
    const unitRef = useRef(null);
    const priceRef = useRef(null);
    const stockRef = useRef(null);

    // Editing states
    const [nameEditing, setNameEditingState] = useState(false);
    const [unitEditing, setUnitEditingState] = useState(false);
    const [priceEditing, setPriceEditingState] = useState(false);
    const [stockEditing, setStockEditingState] = useState(false);

    // Values
    const [name, setNameValue] = useState(defaultName);
    const [category, setCategoryValue] = useState(defaultCategory);
    const [unit, setUnitValue] = useState(defaultUnit);
    const [price, setPriceValue] = useState(defaultPrice);
    const [stock, setStockValue] = useState(defaultStock);

    const inputs = useMemo(
        () => [
            {
                ref: nameRef,
                title: 'Product name',
                inputValue: name,
                editingState: nameEditing,
                setValue: setNameValue,
                setEditingState: setNameEditingState,
            },
            {
                ref: categoryRef,
                title: 'Category',
                inputValue: category,
                editingState: false,
                setValue: setCategoryValue,
                setEditingState: () => null,
            },
            {
                ref: unitRef,
                title: 'Unit',
                inputValue: unit,
                editingState: unitEditing,
                setValue: setUnitValue,
                setEditingState: setUnitEditingState,
            },
            {
                ref: priceRef,
                title: 'Price',
                inputValue: price,
                editingState: priceEditing,
                setValue: setPriceValue,
                setEditingState: setPriceEditingState,
            },
            {
                ref: stockRef,
                title: 'Stock',
                inputValue: stock,
                editingState: stockEditing,
                setValue: setStockValue,
                setEditingState: setStockEditingState,
            },
        ],
        [
            nameRef,
            categoryRef,
            category,
            unitRef,
            priceRef,
            stockRef,
            nameEditing,
            unitEditing,
            priceEditing,
            stockEditing,
            name,
            unit,
            price,
            stock,
        ],
    );

    return (
        <Transition
            in={inProp}
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <Portal>
                    <section
                        className={Styles.bg}
                        style={{
                            ...opacityTransitionConfig().defaultStyles,
                            ...opacityTransitionConfig().transitionStyles[state],
                        }}
                    >
                        <div className={Styles.container}>
                            {/* Image */}
                            <img src={defaultImage} alt='' className={Styles.img} />

                            {/* Input fields */}
                            {inputs.map(
                                (
                                    {
                                        title,
                                        inputValue,
                                        editingState,
                                        setValue,
                                        setEditingState,
                                        ref,
                                    },
                                    index,
                                ) => (
                                    <div className={Styles.inputFieldBlock} key={index}>
                                        <p className={Styles.subtitle}>{title}</p>
                                        <input
                                            className={Styles.value}
                                            value={inputValue}
                                            ref={ref}
                                            onChange={({ target: { value } }) => setValue(value)}
                                            onClick={() => setEditingState(true)}
                                        />
                                        <Button
                                            className={Styles.button}
                                            content={
                                                <Icon name={editingState ? 'check' : 'edit'} />
                                            }
                                            onClick={() => {
                                                setEditingState(!editingState);
                                                return editingState
                                                    ? ref.current.blur()
                                                    : ref.current.focus();
                                            }}
                                        />
                                    </div>
                                ),
                            )}
                        </div>

                        <Button
                            className={Styles.close}
                            content={<Icon name='close' />}
                            onClick={closePopup}
                        />
                        <Button
                            className={Styles.apply}
                            content={<Icon name='check' color='white' className={Styles.icon} />}
                            onClick={() => {
                                updateItemFromPreviewAsync({
                                    index: itemIndex,
                                    data: {
                                        categoryName: category,
                                        name,
                                        stock,
                                        price,
                                        unit,
                                    },
                                });
                                closePopup();
                            }}
                            filled
                        />
                    </section>
                </Portal>
            )}
        </Transition>
    );
};

export const SupplierItemEditingPopup = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierItemEditingPopupComponent);
