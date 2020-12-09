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
    MarketFiltersOverlay,
    NewLocationOverlay,
    OrderFiltersOverlay,
    NewListItemOverlay,
    SupplierUploadOverlay,
} from 'components';
import { store } from './bus/init/store';
import { history } from './bus/init/middleware/core';
import { Settings } from 'luxon';

// Setting luxon default localization
Settings.defaultLocale = 'uk-ua';

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
            <MarketFiltersOverlay />
            <OrderFiltersOverlay />
            <NewLocationOverlay />
            <NewListItemOverlay />
            <SupplierUploadOverlay />
            <Cart />
        </Router>
    </Provider>,
    document.getElementById('app'),
);
