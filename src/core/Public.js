//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { Login } from '../pages';

// Instruments
import { book } from './book';

export const Public = () => (
    <Switch>
        <Route path={book.home} component={Login} />
        <Redirect to={book.home} />
    </Switch>
);
