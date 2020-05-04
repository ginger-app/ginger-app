// Core
import React from 'react';
import { connect } from 'react-redux';

// Components
import { PublicRoutes } from './routes';

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.get('isAuthenticated'),
});

const AppComponent = () => <PublicRoutes />;

export const App = connect(mapStateToProps)(AppComponent);
