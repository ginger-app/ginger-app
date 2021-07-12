// Core
import React, { FC } from 'react';
import { connect } from 'react-redux';

// Styles
import Styles from './styles.module.scss';

// Instruments

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    ...state,
});

const mapDispatchToProps = {
    showNewListItemOverlay: uiActions.showNewListItemOverlay,
    setNewListItemOverlayData: uiActions.setNewListItemOverlayData,
};

type SupplierListItemPropsTypes = typeof mapDispatchToProps &
    ReturnType<typeof mapStateToProps> & {
        className?: string;
        category: string;
        unit: string;
        price: number;
        stock: number;
        id: string;
        name: string;
        image: string;
    };

const SupplierListItemComponent: FC<SupplierListItemPropsTypes> = ({
    className,
    showNewListItemOverlay,
    setNewListItemOverlayData,
    category,
    unit,
    price,
    stock,
    id,
    name,
    image,
}) => {
    return (
        <section
            className={[Styles.container, className].filter(Boolean).join(' ')}
            onClick={() => {
                setNewListItemOverlayData({ category, unit, price, stock, id, name, img: image });
                showNewListItemOverlay();
            }}
        >
            <img className={Styles.image} src={image} alt='' />
            <p className={Styles.itemName}>{name}</p>
            <p className={Styles.infoValue}>
                {stock} {unit}
            </p>
            <p className={Styles.infoValue}>{price.toFixed(2)}</p>
        </section>
    );
};

export const SupplierListItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierListItemComponent);
