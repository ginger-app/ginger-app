// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { ClientProfile } from 'domains/client/pages';
import { opacityTransitionConfig } from 'utils/transitionConfig';

// Actions
import { profileActions } from 'bus/profile/profile.actions';
import { SupplierProfile } from 'domains/supplier/pages';

const mapStateToProps = (state) => ({
    profile: state.profile,
});

const mapDispatchToProps = {
    getUserDataAsync: profileActions.getUserDataAsync,
};

const ProfileComponent = ({ profile, getUserDataAsync }) => {
    const { name, role } = profile;

    useEffect(() => {
        getUserDataAsync();
    }, [getUserDataAsync]);

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
