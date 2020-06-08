// Core
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// Components
import { PublicRoutes } from './routes';

// Actions
import { profileActions } from 'bus/profile/actions';
import { authActions } from 'bus/auth/actions';

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.get('isAuthenticated'),
});

const mapDispatchToProps = {
    getUserDataAsync: profileActions.getUserDataAsync,
    getGoogleMapsKeyAsync: authActions.getGoogleMapsKeyAsync,
};

const AppComponent = ({ getUserDataAsync, getGoogleMapsKeyAsync }) => {
    useEffect(() => {
        // not even trying to handle error
        try {
            if (localStorage.getItem('ginger-token')) {
                getUserDataAsync();
            }
        } catch (err) {}

        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        const vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        getGoogleMapsKeyAsync();
    }, []);

    return <PublicRoutes />;
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
