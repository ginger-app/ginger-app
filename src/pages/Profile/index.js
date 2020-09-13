// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Transition } from 'react-transition-group';

// Styles
import Styles from './styles.module.scss';

// Instruments
import { Button, Icon, Navigation } from 'components';
import { opacityTransitionConfig } from 'utils/transitionConfig';
import userpic from 'theme/assets/images/ginger.jpg';

// Actions
import { authActions } from 'bus/auth/actions';
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = (state) => ({
    profile: state.profile.toJS(),
});

const mapDispatchToProps = {
    logoutAsync: authActions.logoutAsync,
    getUserDataAsync: profileActions.getUserDataAsync,
};

const ProfileComponent = ({ profile, logoutAsync, getUserDataAsync }) => {
    const {
        name,
        // favorites,
        // orders,
        // bonuses,
        // userpic
    } = profile;

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
                    <img className={Styles.avatar} src={userpic} alt='avatar' />
                    <p className={Styles.name}>{name}</p>

                    <NavLink className={Styles.link} to='/lists'>
                        <span>Lists</span>
                    </NavLink>
                    <NavLink className={Styles.link} to='/orders'>
                        <span>Orders</span>
                    </NavLink>
                    <NavLink className={[Styles.link, Styles.centered].join(' ')} to='/locations'>
                        <span>Locations</span>
                    </NavLink>

                    <div className={Styles.termsAndConditionsButton}>Terms & Conditions</div>

                    {/* Footer nav */}
                    <Navigation
                        centerButton={
                            <Button className={Styles.navButton} content={<Icon name='edit' />} />
                        }
                        rightButton={
                            <Button
                                className={Styles.navButton}
                                content={
                                    <Icon
                                        name='logout'
                                        onClick={logoutAsync}
                                        className={Styles.logoutIcon}
                                    />
                                }
                            />
                        }
                    />
                </section>
            )}
        </Transition>
    );
};

export const ProfilePage = connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);
