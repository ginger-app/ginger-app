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
import {
    CartToaster,
    Cart,
    SignupOverlay,
    LoginOverlay,
    CodeConfirmationOverlay,
} from 'components';

render(
    <Provider store={store}>
        <Router history={history}>
            <App />

            {/* All of the overlays and popups that should be
                available on every possible page are below */}
            <CartToaster />
            <SignupOverlay />
            <LoginOverlay />
            <CodeConfirmationOverlay />
            <Cart />
        </Router>
    </Provider>,
    document.getElementById('app'),
);
