// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

// Styles
import './theme/scss/index.scss';

// App
import { App } from './core';

// Instruments
import {
    CartToaster,
    Cart,
    SignupOverlay,
    LoginOverlay,
    CodeConfirmationOverlay,
    SearchOverlay,
    FiltersOverlay,
} from 'components';
import { store } from './bus/init/store';
import { history } from './bus/init/middleware/core';

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
            <SearchOverlay />
            <FiltersOverlay />
            <Cart />
        </Router>
    </Provider>,
    document.getElementById('app'),
);
