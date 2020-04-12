//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { LoginPage, SignupPage, MarketPage } from '../pages';

// Instruments
import { book } from './book';

export const Public = () => (
    <Switch>
        <Route path={book.signin} component={LoginPage} />
        <Route path={book.signup} component={SignupPage} />
        <Route path={book.market} component={MarketPage} />
        <Redirect to={book.market} />
    </Switch>
);
