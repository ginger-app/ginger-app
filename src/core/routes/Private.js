//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { ProfilePage, HomePage } from 'pages';

// Instruments
import { book } from 'core';

export const Private = () => (
    <Switch>
        <Route path={book.profile} component={ProfilePage} />
        <Route path={book.home} component={HomePage} />
        <Redirect to={book.home} />
    </Switch>
);
