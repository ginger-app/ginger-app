//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { LoginPage } from '../pages';

// Instruments
import { book } from './book';

export const Public = () => (
    <Switch>
        <Route path={book.signin} component={LoginPage} />
        <Redirect to={book.signin} />
    </Switch>
);
