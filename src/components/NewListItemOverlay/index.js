// Core
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { useHistory } from 'react-router-dom';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import logo from 'theme/assets/images/apples-mock.png';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

const mapStateToProps = (state) => ({
    newListItemOverlay: state.ui.newListItemOverlay,
});

const mapDispatchToProps = {
    hideNewListItemOverlay: uiActions.hideNewListItemOverlay,
    addNewSupplierListItemAsync: profileActions.addNewSupplierItemAsync,
};

const NewListItemOverlayComponent = ({
    newListItemOverlay,
    hideNewListItemOverlay,
    addNewSupplierListItemAsync,
}) => {
    const history = useHistory();
    const [historyListener, setRemoveListener] = useState();

    useEffect(() => {
        if (newListItemOverlay) {
            const handler = () => {
                hideNewListItemOverlay();
                history.go(1);
            };

            window.addEventListener('popstate', handler);

            setRemoveListener(() => handler);
        } else {
            window.removeEventListener('popstate', historyListener);
        }
        // eslint-disable-next-line
    }, [newListItemOverlay]);

    // Refs
    const nameRef = useRef(null);
    const categoryRef = useRef(null);
    const unitRef = useRef(null);
    const priceRef = useRef(null);
    const stockRef = useRef(null);

    // Editing states
    const [nameEditing, setNameEditingState] = useState(false);
    const [categoryEditing, setCategoryEditingState] = useState(false);
    const [unitEditing, setUnitEditingState] = useState(false);
    const [priceEditing, setPriceEditingState] = useState(false);
    const [stockEditing, setStockEditingState] = useState(false);

    // Values
    const [name, setNameValue] = useState('');
    const [category, setCategoryValue] = useState('');
    const [unit, setUnitValue] = useState('');
    const [price, setPriceValue] = useState('');
    const [stock, setStockValue] = useState('');

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
                ref: stockRef,
                title: 'Stock left',
                inputValue: stock,
                editingState: stockEditing,
                setValue: setStockValue,
                setEditingState: setStockEditingState,
            },
        ],
        [
            nameRef,
            categoryRef,
            unitRef,
            priceRef,
            stockRef,
            nameEditing,
            categoryEditing,
            unitEditing,
            priceEditing,
            stockEditing,
            name,
            category,
            unit,
            price,
            stock,
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
                                        disabled={!editingState}
                                    />
                                    <Button
                                        className={Styles.button}
                                        content={<Icon name={editingState ? 'check' : 'edit'} />}
                                        onClick={() => {
                                            setEditingState(!editingState);
                                            return editingState
                                                ? setImmediate(() => ref.current.blur())
                                                : setImmediate(() => ref.current.focus());
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
                        onClick={() =>
                            addNewSupplierListItemAsync({
                                name,
                                category,
                                unit,
                                price,
                                stock,
                            })
                        }
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
