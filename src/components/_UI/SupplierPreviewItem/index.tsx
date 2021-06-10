// Core
import React, { useState, FC } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon, SupplierItemEditingPopup } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import mockApples from 'theme/assets/images/apples-mock.png';

// Actions
import { profileActions } from 'bus/profile/profile.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    ...state,
});

const mapDispatchToProps = {
    removeItemFromPreviewAsync: profileActions.removeItemFromPreviewAsync,
};

type SupplierPreviewItemPropsTypes = typeof mapDispatchToProps & {
    className?: string;
    name: string;
    price: string;
    image?: string;
    stock: string;
    unit: string;
    categoryName: string;
    index: number;
};

const SupplierPreviewItemComponent: FC<SupplierPreviewItemPropsTypes> = ({
    className,
    name,
    price,
    image,
    stock,
    unit,
    categoryName,
    index,
    removeItemFromPreviewAsync,
}) => {
    const [itemEditing, setItemEditingState] = useState(false);

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
                    {/* Left side */}
                    <img className={Styles.image} src={image || mockApples} alt='' />
                    <p className={Styles.itemName}>{name}</p>

                    <div
                        className={Styles.deleteButton}
                        onClick={() => removeItemFromPreviewAsync(index)}
                    >
                        <Icon name='close' color='grey' className={Styles.icon} />
                    </div>

                    {/* Right side */}
                    <div
                        className={Styles.infoBox}
                        style={{
                            gridRow: 1,
                            gridColumn: '2 / 4',
                        }}
                    >
                        <p className={Styles.subtitle}>Категорія</p>
                        <p className={Styles.value}>{categoryName}</p>
                    </div>
                    <div
                        className={Styles.infoBox}
                        style={{
                            gridRow: 2,
                            gridColumn: 2,
                        }}
                    >
                        <p className={Styles.subtitle}>Фасовка</p>
                        <p className={Styles.value}>{unit}</p>
                    </div>
                    <div
                        className={Styles.infoBox}
                        style={{
                            gridRow: 2,
                            gridColumn: 3,
                        }}
                    >
                        <p className={Styles.subtitle}>Залишок</p>
                        <p className={Styles.value}>{stock}</p>
                    </div>
                    <div
                        className={Styles.infoBox}
                        style={{
                            gridRow: 3,
                            gridColumn: 3,
                        }}
                    >
                        <p className={Styles.subtitle}>Ціна</p>
                        <p className={Styles.value}>{price}</p>
                    </div>

                    <Button
                        className={Styles.editButton}
                        content={<Icon name='edit' />}
                        onClick={() => setItemEditingState(true)}
                    />

                    {/* Popup */}
                    <SupplierItemEditingPopup
                        defaultName={name}
                        defaultUnit={unit}
                        defaultPrice={price}
                        defaultStock={stock}
                        defaultCategory={categoryName}
                        defaultImage={image || mockApples}
                        closePopup={() => setItemEditingState(false)}
                        inProp={itemEditing}
                        itemIndex={index}
                    />
                </section>
            )}
        </Transition>
    );
};

export const SupplierPreviewItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierPreviewItemComponent);
