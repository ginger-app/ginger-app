// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { ClientProfile } from 'domains/client/pages';
import { Button, Icon, Navigation } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import { book } from 'core/routes';
import logo from 'theme/assets/svg/logo.svg';

// Actions
import { authActions } from 'bus/auth/actions';
import { profileActions } from 'bus/profile/profile.actions';
import { SupplierProfile } from 'domains/supplier/pages';

const mapStateToProps = (state) => ({
    profile: state.profile,
});

const mapDispatchToProps = {
    logoutAsync: authActions.logoutAsync,
    getUserDataAsync: profileActions.getUserDataAsync,
};

const ProfileComponent = ({ profile, logoutAsync, getUserDataAsync }) => {
    const { name, role, userpic } = profile;

    useEffect(() => {
        getUserDataAsync();
    }, [getUserDataAsync]);

    const isSupplier = role === 'supplier';

    return name.length === 0 ? (
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
    ) : role === 'client' ? (
        <ClientProfile />
    ) : (
        <SupplierProfile />
    );
};

export const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
