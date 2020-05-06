// Core
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

// Components
import { PublicRoutes } from './routes';

// Actions
import { profileActions } from 'bus/profile/actions';

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.get('isAuthenticated'),
});

const mapDispatchToProps = {
    getUserDataAsync: profileActions.getUserDataAsync,
};

const AppComponent = ({ getUserDataAsync }) => {
    useEffect(() => {
        if (sessionStorage.getItem('ginger-token')) {
            getUserDataAsync();
        }
    }, []);

    return <PublicRoutes />;
};

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
