//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { Login } from '../pages';

// Instruments
import { book } from './book';

export const Public = () => (
    <Switch>
        <Route path={book.signin} component={Login} />
        <Route path={book.signinConfirmation} component={Login} />
        <Redirect to={book.signin} />
    </Switch>
);
