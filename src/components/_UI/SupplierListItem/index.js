// Core
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {
    showNewListItemOverlay: uiActions.showNewListItemOverlay,
    setNewListItemOverlayData: uiActions.setNewListItemOverlayData,
};

const SupplierListItemComponent = ({
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

SupplierListItemComponent.propTypes = {
    className: PropTypes.string,
};

export const SupplierListItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierListItemComponent);
