// Core
import React, { useState, useRef, useMemo } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import logo from 'theme/assets/images/apples-mock.png';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    newListItemOverlay: state.ui.get('newListItemOverlay'),
});

const mapDispatchToProps = {
    hideNewListItemOverlay: uiActions.hideNewListItemOverlay,
};

const NewListItemOverlayComponent = ({ newListItemOverlay, hideNewListItemOverlay }) => {
    // Refs
    const nameRef = useRef(null);
    const categoryRef = useRef(null);
    const unitRef = useRef(null);
    const priceRef = useRef(null);
    const amountRef = useRef(null);

    // Editing states
    const [nameEditing, setNameEditingState] = useState(false);
    const [categoryEditing, setCategoryEditingState] = useState(false);
    const [unitEditing, setUnitEditingState] = useState(false);
    const [priceEditing, setPriceEditingState] = useState(false);
    const [amountEditing, setAmountEditingState] = useState(false);

    // Values
    const [name, setNameValue] = useState('');
    const [category, setCategoryValue] = useState('');
    const [unit, setUnitValue] = useState('');
    const [price, setPriceValue] = useState('');
    const [amount, setAmountValue] = useState('');

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
                editingState: categoryEditing,
                setValue: setCategoryValue,
                setEditingState: setCategoryEditingState,
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
                ref: amountRef,
                title: 'Amount left',
                inputValue: amount,
                editingState: amountEditing,
                setValue: setAmountValue,
                setEditingState: setAmountEditingState,
            },
        ],
        [
            nameRef,
            categoryRef,
            unitRef,
            priceRef,
            amountRef,
            nameEditing,
            categoryEditing,
            unitEditing,
            priceEditing,
            amountEditing,
            name,
            category,
            unit,
            price,
            amount,
        ],
    );

    return (
        <Transition
            in={newListItemOverlay}
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig(300).timeout}
        >
            {(state) => (
                <section
                    className={Styles.bg}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <div className={Styles.container}>
                        {/* Image */}
                        <img src={logo} alt='' className={Styles.img} />

                        {/* Input fields */}
                        {inputs.map(
                            (
                                { title, inputValue, editingState, setValue, setEditingState, ref },
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
                                        content={<Icon name={editingState ? 'check' : 'edit'} />}
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
                        onClick={hideNewListItemOverlay}
                    />
                    <Button
                        className={Styles.apply}
                        content={<Icon name='check' color='white' className={Styles.icon} />}
                        onClick={hideNewListItemOverlay}
                        filled
                    />
                </section>
            )}
        </Transition>
    );
};

export const NewListItemOverlay = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewListItemOverlayComponent);
