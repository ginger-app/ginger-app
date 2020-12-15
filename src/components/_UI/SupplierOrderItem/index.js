// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import stylePropType from 'react-style-proptype';
import { OrderStatusLabel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { DateTime } from 'luxon';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const SupplierOrderItemComponent = ({
    className,
    style,
    status,
    _id,
    deliveryDate,
    sum,
    items,
    index,
    location,
    client,
}) => {
    return (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={{
                enter: index * 75,
            }}
        >
            {(state) => (
                <NavLink
                    className={[Styles.container, className].filter(Boolean).join(' ')}
                    style={{
                        ...style,
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                    to={`/orders/${_id}`}
                >
                    <p className={Styles.date}>{DateTime.fromISO(deliveryDate).toLocaleString()}</p>
                    <OrderStatusLabel status={status} className={Styles.orderStatusLabel} />

                    <p className={Styles.subtitle}>Location:</p>
                    <p className={Styles.location}>{location.locationName}</p>

                    <p className={[Styles.subtitle, Styles.alignRight].join(' ')}>Client:</p>
                    <p className={[Styles.supplier, Styles.alignRight].join(' ')}>{client.name}</p>

                    <p className={Styles.price}>{sum}</p>
                    <div className={Styles.cart}>
                        {items.map(({ item }, key) => (
                            <img src={item.image} alt='' className={Styles.cartItem} key={key} />
                        ))}
                    </div>
                </NavLink>
            )}
        </Transition>
    );
};

SupplierOrderItemComponent.propTypes = {
    className: PropTypes.string,
    style: stylePropType,
    status: PropTypes.string,
    sum: PropTypes.string,
    index: PropTypes.number,
};

export const SupplierOrderItem = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SupplierOrderItemComponent);
