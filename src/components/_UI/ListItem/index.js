// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import isEmpty from 'lodash/isEmpty';
import { Icon, Button } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

export const ListItem = ({ className, index = 0, image, name, unit, minPrice, suppliers, _id }) => {
    const supplierData = {
        supplierName: 'Галичина',
        deliveryConditions: ['Доставка на наступний день', 'Від 10 ящ'],
    };

    const { supplierName, deliveryConditions } = supplierData;

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
                        <span>від {minPrice} грн.</span>
                        <span className={Styles.unit}>1{unit}</span>
                    </div>

                    {/* Devider */}
                    <div className={Styles.devider} />

                    {/* Supplier data */}
                    <p className={Styles.supplierSubtitle}>Почтачальник:</p>
                    {isEmpty(supplierData) ? (
                        <p className={Styles.notChosen}>Не обраний</p>
                    ) : (
                        <>
                            <p className={Styles.supplierName}>{supplierName}</p>
                            <div className={Styles.ranking} />
                            <div className={Styles.deliveryConditions}>
                                <p className={Styles.title}>Умови поставки</p>
                                {deliveryConditions.map((item, key) => (
                                    <p className={Styles.item} key={key}>
                                        {item}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}
                    <p className={Styles.suppliersAmount}>
                        Постачальників: <span>{suppliers.length}</span>
                    </p>

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
    minPrice: PropTypes.number.isRequired,
    // maxPrice: PropTypes.number.isRequired,
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
