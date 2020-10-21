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
import { book } from 'core/routes';
import logo from 'theme/assets/svg/logo.svg';

// Actions
import { authActions } from 'bus/auth/actions';
import { profileActions } from 'bus/profile/actions';

import { MAIN_URL } from 'api';

const mapStateToProps = (state) => ({
    profile: state.profile.toJS(),
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

    useEffect(() => {
        const refresh = async () => {
            const response = await fetch(`${MAIN_URL}/auth/refresh`, {
                method: 'GET',
                credentials: 'include',
            });

            const result = await response.json();

            console.log(result);
        };

        refresh();
    }, []);

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
                    <img className={Styles.avatar} src={userpic || logo} alt='avatar' />
                    <p className={Styles.name}>{name}</p>

                    <NavLink
                        className={Styles.link}
                        to={isSupplier ? book.supplierLists : book.lists}
                    >
                        <span>{isSupplier ? 'Товарна база' : 'Списки'}</span>
                    </NavLink>
                    <NavLink
                        className={Styles.link}
                        to={isSupplier ? book.supplierOrders : book.orders}
                    >
                        <span>Замовлення</span>
                    </NavLink>
                    <NavLink
                        className={[Styles.link, Styles.centered].join(' ')}
                        to={isSupplier ? book.deliveryConditions : book.locationsList}
                    >
                        <span>{isSupplier ? 'Умови доставки' : 'Локації'}</span>
                    </NavLink>

                    <div className={Styles.termsAndConditionsButton}>Умови використання</div>

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
