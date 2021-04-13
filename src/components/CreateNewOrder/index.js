// Core
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { GradientBorder } from 'components';
import { book } from 'core/routes';
import isEmpty from 'lodash/isEmpty';
import button from 'theme/assets/svg/plus-button.svg';

// Actions
import { uiActions } from 'bus/ui/actions';

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    unfinishedOrder: state.profile.unfinishedOrder,
    role: state.profile.role,
});

const mapDispatchToProps = {
    showLoginOverlay: uiActions.showLoginOverlay,
};

const CreateNewOrderComponent = ({
    className,
    unfinishedOrder,
    isAuthenticated,
    role,
    showLoginOverlay,
}) => {
    const showUnfinishedOrderButton =
        isAuthenticated && role === 'client' && !isEmpty(unfinishedOrder);

    return (
        <section
            className={`${Styles.container} ${
                showUnfinishedOrderButton && Styles.unfinishedOrder
            } ${className}`}
        >
            <NavLink
                className={`${Styles.newOrderButton} ${
                    showUnfinishedOrderButton && Styles.minified
                }`}
                to={book.newOrder}
                onClick={(e) => {
                    if (!isAuthenticated) {
                        e.preventDefault();
                        showLoginOverlay();
                    }
                }}
            >
                <p className={Styles.newOrderText}>Create new order</p>
                <img src={button} alt='' />
            </NavLink>
            {showUnfinishedOrderButton && (
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
    // unfinishedOrder: PropTypes.bool.isRequired,
};

export const CreateNewOrder = connect(mapStateToProps, mapDispatchToProps)(CreateNewOrderComponent);
