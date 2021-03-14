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
import arrow from 'theme/assets/svg/right-full-arrow.svg';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const OrderItemComponent = ({
    className,
    style,
    status,
    _id,
    deliveryDate,
    sum,
    items,
    index,
    // location,
    supplier,
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
                    <OrderStatusLabel status={status} className={Styles.orderStatusLabel} />

                    <p className={Styles.date}>
                        {DateTime.fromISO(deliveryDate).toLocaleString({
                            month: 'long',
                            day: '2-digit',
                            year: 'numeric',
                        })}
                    </p>
                    <p className={Styles.price}>{sum} грн.</p>

                    {/* <p className={Styles.location}>{location.locationName}</p> */}

                    <p className={[Styles.supplier, Styles.alignRight].join(' ')}>
                        {supplier.companyName}
                    </p>

                    <div className={Styles.cart}>
                        <span>Товарів:</span>
                        <span>{items.length}</span>
                        <img src={arrow} alt='' />
                    </div>
                </NavLink>
            )}
        </Transition>
    );
};

OrderItemComponent.propTypes = {
    className: PropTypes.string,
    style: stylePropType,
    status: PropTypes.string,
    sum: PropTypes.string,
    index: PropTypes.number,
};

export const OrderItem = connect(mapStateToProps, mapDispatchToProps)(OrderItemComponent);
