// Core
import React from 'react';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Icon, Button } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';

export const ListItem = (props) => {
    const { className, index = 0, image, name, unit, minPrice, _id } = props;

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
                        <span className={Styles.unit}>{unit}</span>
                    </div>

                    {/* Devider */}
                    <div className={Styles.devider} />

                    {/* Supplier data */}
                    <div className={Styles.deliveryConditions}>
                        <p className={Styles.title}>Умови поставки</p>
                    </div>

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
};
