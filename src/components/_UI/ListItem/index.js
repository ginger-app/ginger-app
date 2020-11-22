// Core
import React, { useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import isEmpty from 'lodash/isEmpty';
import { Icon, Button } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

export const ListItem = ({
    className,
    index = 0,
    image,
    name,
    unit,
    suppliers,
    prices,
    _id,
    chosenSupplierId,
}) => {
    const [supplierData, setSupplierData] = useState({});
    const [itemPrice, setItemPrice] = useState(null);

    useEffect(() => {
        const supplier = suppliers.find(({ _id: supplierId }) => supplierId === chosenSupplierId);

        setSupplierData(supplier);
        setItemPrice(prices[chosenSupplierId]);
    }, [chosenSupplierId, _id, suppliers, prices]);

    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig(index * 100).timeout}
        >
            {(state) => (
                <section
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    {/* Product data */}
                    <img src={image} className={Styles.image} alt='' />
                    <p className={Styles.itemName}>{name}</p>
                    <div className={Styles.price}>
                        <span>{itemPrice} грн.</span>
                        <span className={Styles.unit}>{unit}</span>
                    </div>

                    {/* Devider */}
                    <div className={Styles.devider} />

                    {/* Supplier data */}
                    <p className={Styles.supplierSubtitle}>Поcтачальник:</p>
                    {isEmpty(supplierData) ? (
                        <p className={Styles.notChosen}>Не обраний</p>
                    ) : (
                        <>
                            <p className={Styles.supplierName}>{supplierData.name}</p>
                            <div className={Styles.deliveryConditions}>
                                <p className={Styles.title}>Умови поставки</p>
                                {supplierData.conditions.map((item, key) => (
                                    <p className={Styles.item} key={key}>
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}

                    {/* Action buttons */}
                    <div className={Styles.deleteButton}>
                        <Icon name='close' color='grey' />
                    </div>
                    <NavLink to={`/products/${_id}`} className={Styles.button}>
                        <Button text='Обрати' filled />
                    </NavLink>
                </section>
            )}
        </Transition>
    );
};
// index, name, price, unit, suppliers, supplierData
ListItem.propTypes = {
    className: PropTypes.string,
    index: PropTypes.number,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    suppliers: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.shape({}),
            PropTypes.shape({
                supplierName: PropTypes.string.isRequired,
                ranking: PropTypes.number.isRequired,
                deliveryConditions: PropTypes.arrayOf(PropTypes.string).isRequired,
            }),
        ]),
    ).isRequired,
};
