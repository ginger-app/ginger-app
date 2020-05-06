// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { history } from 'bus/init/middleware/core';
import userpic from 'theme/assets/images/ginger.jpg';
import arrow from 'theme/assets/svg/left-arrow-dark.svg';
import edit from 'theme/assets/svg/edit-dark.svg';

// Actions
import { authActions } from 'bus/auth/actions';
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    profile: state.profile.toJS(),
});

const mapDispatchToProps = {
    logout: authActions.logout,
    getUserDataAsync: profileActions.getUserDataAsync,
};

const ProfileComponent = ({ className, profile, logout, getUserDataAsync }) => {
    const {
        firstName,
        favorites,
        orders,
        bonuses,
        // userpic
    } = profile;

    useEffect(() => {
        getUserDataAsync();
    }, []);

    return firstName.length === 0 ? (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={Styles.loading}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    Loading....
                </section>
            )}
        </Transition>
    ) : (
        <Transition
            in
            appear
            mountOnEnter
            unmountOnExit
            timeout={opacityTransitionConfig().timeout}
        >
            {(state) => (
                <section
                    className={Styles.container}
                    style={{
                        ...opacityTransitionConfig().defaultStyles,
                        ...opacityTransitionConfig().transitionStyles[state],
                    }}
                >
                    <div className={Styles.backButton} onClick={history.goBack}>
                        <img src={arrow} alt='back button' />
                    </div>
                    <div className={Styles.editButton}>
                        <img src={edit} alt='edit profile' />
                    </div>
                    <img className={Styles.avatar} src={userpic} alt='avatar' />
                    <p className={Styles.name}>{firstName}</p>
                    <div className={Styles.listsBlock}>
                        {Object.keys(favorites).length} <span>Favorites</span>
                    </div>
                    <div className={Styles.ordersBlock}>
                        {orders.length} <span>Orders</span>
                    </div>
                    <p className={Styles.bonuses}>
                        Your bonuses: <span>{bonuses} $</span>
                    </p>
                    <div className={Styles.getBonusesButton}>Get bonuses</div>
                    <div className={Styles.termsAndConditionsButton}>Terms & Conditions</div>
                    <div className={Styles.logoutButton} onClick={logout}>
                        Log out
                    </div>
                </section>
            )}
        </Transition>
    );
};

export const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
