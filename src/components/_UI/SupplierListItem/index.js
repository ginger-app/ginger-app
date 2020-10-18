// Core
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import mockApples from 'theme/assets/images/apples-mock.png';

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
    category = 'Фрукти',
    unit = 'Кг',
    price = '43.99 грн.',
    stock = 100,
    id = 'testId-123-123-123-123',
    name = 'Яблука чемпіон фреш уп. 1кг нетто +- 50гр.',
    img = mockApples,
}) => {
    return (
        <section
            className={[Styles.container, className].filter(Boolean).join(' ')}
            onClick={() => {
                setNewListItemOverlayData({ category, unit, price, stock, id, name, img });
                showNewListItemOverlay();
            }}
        >
            <img className={Styles.image} src={img} alt='' />
            <p className={Styles.itemName}>{name}</p>
            <p className={Styles.infoValue}>{price}</p>
            <p className={Styles.infoValue}>{stock}</p>
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
