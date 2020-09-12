// Core
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { GradientBorder } from 'components';
import button from 'theme/assets/svg/plus-button.svg';
import { book } from 'core/routes';

const mapStateToProps = (state) => ({
    ...state,
});

const mapDispatchToProps = {};

const CreateNewOrderComponent = ({ className, unfinishedOrder = true }) => {
    return (
        <section
            className={`${Styles.container} ${
                unfinishedOrder && Styles.unfinishedOrder
            } ${className}`}
        >
            <NavLink
                className={`${Styles.newOrderButton} ${unfinishedOrder && Styles.minified}`}
                to={book.newOrder}
            >
                <p className={Styles.newOrderText}>Create new order</p>
                <img src={button} alt='' />
            </NavLink>
            {unfinishedOrder && (
                <GradientBorder>
                    <NavLink
                        className={Styles.backToOrderButton}
                        to={`${book.newOrder}?unfinished`}
                    >
                        <p className={Styles.backToOrdertext}>Continue ordering</p>
                        <img src={button} alt='' />
                    </NavLink>
                </GradientBorder>
            )}
        </section>
    );
};

CreateNewOrderComponent.propTypes = {
    unfinishedOrder: PropTypes.bool.isRequired,
};

export const CreateNewOrder = connect(mapStateToProps, mapDispatchToProps)(CreateNewOrderComponent);
