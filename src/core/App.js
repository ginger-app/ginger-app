// Core
import React from 'react';
import { connect } from 'react-redux';

// Components
import { Private } from './Private';
import { Public } from './Public';

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.get('isAuthenticated'),
});

const AppComponent = ({ isAuthenticated }) => (isAuthenticated ? <Private /> : <Public />);

export const App = connect(mapStateToProps)(AppComponent);
