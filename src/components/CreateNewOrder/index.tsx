// Core
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { GradientBorder } from 'components';
import { book } from 'core/routes';
import isEmpty from 'lodash/isEmpty';
import { RoundButton } from 'domains/ui/components';
import button from 'theme/assets/svg/plus-button.svg';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { AppState } from 'bus/init/rootReducer';

const mapStateToProps = (state: AppState) => ({
    isAuthenticated: state.auth.isAuthenticated,
    unfinishedOrder: state.profile.unfinishedOrder,
    role: state.profile.role,
});

const mapDispatchToProps = {
    showLoginOverlay: uiActions.showLoginOverlay,
};

type CreateNewOrderPropsType = ReturnType<typeof mapStateToProps> &
    typeof mapDispatchToProps & { className: string };

const CreateNewOrderComponent: FC<CreateNewOrderPropsType> = ({
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
                <p className={Styles.newOrderText}>Створити нове замовлення</p>
                {/* <RoundButton
                    className={Styles.plusButton}
                    icon='plus'
                    size={window.innerWidth > 700 ? '5rem' : '3rem'}
                    onClick={(e) => {
                        if (!isAuthenticated) {
                            e.preventDefault();
                            showLoginOverlay();
                        }
                    }}
                /> */}
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

export const CreateNewOrder = connect(mapStateToProps, mapDispatchToProps)(CreateNewOrderComponent);
