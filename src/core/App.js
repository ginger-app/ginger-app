// Core
import React, { useEffect } from 'react';
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
        if (localStorage.getItem('ginger-token')) {
            getUserDataAsync();
        }
        getGoogleMapsKeyAsync();
    }, []);

    return <PublicRoutes />;
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
