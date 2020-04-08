//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { LoginPage, SignupPage } from '../pages';

// Instruments
import { book } from './book';

export const Public = () => (
    <Switch>
        <Route path={book.signin} component={LoginPage} />
        <Route path={book.signup} component={SignupPage} />
        <Redirect to={book.signup} />
    </Switch>
);
