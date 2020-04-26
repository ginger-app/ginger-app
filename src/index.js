// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

// Styles
import './theme/scss/index.scss';

// App
import { store } from './bus/init/store';
import { history } from './bus/init/middleware/core';
import { App } from './core';

// Components
import { CartToaster, Cart } from 'components';

render(
    <Provider store={store}>
        <Router history={history}>
            <App />
            <CartToaster />
            <Cart />
        </Router>
    </Provider>,
    document.getElementById('app'),
);
