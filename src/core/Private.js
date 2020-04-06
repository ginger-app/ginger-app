//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { ProfilePage } from '../pages';

// Instruments
import { book } from './book';

export const Private = () => (
    <Switch>
        <Route path={book.profile} component={ProfilePage} />
        <Redirect to={book.profile} />
    </Switch>
);
