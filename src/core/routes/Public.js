//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { LoginPage, SignupPage, HomePage } from 'pages';

// Instruments
import { book } from 'core';

export const Public = () => (
    <Switch>
        <Route path={book.signin} component={LoginPage} />
        <Route path={book.signup} component={SignupPage} />
        <Route path={book.home} component={HomePage} />
        <Redirect to={book.home} />
    </Switch>
);
