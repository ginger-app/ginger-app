//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { App } from '../pages';

// Instruments
import { book } from './book';

export const Private = () => (
    <Switch>
        <Route path={book.home} component={App} />
        <Redirect to={book.home} />
    </Switch>
);
