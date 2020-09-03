// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { OrderStatusLabel } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import stylePropType from 'react-style-proptype';
import tomato from 'theme/assets/images/tomato-mock.png';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const OrderItemComponent = ({ className, style, status, id, date, sum, index }) => {
    const cart = [
        {
            img: tomato,
        },
        {
            img: tomato,
        },
        {
            img: tomato,
        },
        {
            img: tomato,
        },
        {
            img: tomato,
        },
        {
            img: tomato,
        },
        {
            img: tomato,
        },
    ];

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
                    to={`/orders/${id}`}
                >
                    <p className={Styles.date}>{new Date(date).toLocaleDateString()}</p>
                    <OrderStatusLabel status={status} className={Styles.orderStatusLabel} />

                    <p className={Styles.subtitle}>Location:</p>
                    <p className={Styles.location}>Forma.coffee</p>

                    <p className={[Styles.subtitle, Styles.alignRight].join(' ')}>Supplier:</p>
                    <p className={[Styles.supplier, Styles.alignRight].join(' ')}>Galychyna</p>

                    <p className={Styles.price}>{sum}</p>
                    <div className={Styles.cart}>
                        {cart.map(({ img }, key) => (
                            <img src={img} alt='' className={Styles.cartItem} key={key} />
                        ))}
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
    id: PropTypes.string,
    date: PropTypes.string,
    sum: PropTypes.number,
    index: PropTypes.number,
};

export const OrderItem = connect(mapStateToProps, mapDispatchToProps)(OrderItemComponent);
