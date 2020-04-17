//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { ProfilePage, HomePage, CategoryPage } from 'pages';

// Instruments
import { book } from 'core';

export const Private = () => (
    <Switch>
        <Route exact path={book.profile} component={ProfilePage} />
        <Route exact path={book.home} component={HomePage} />
        <Route
            exact
            path={`${book.categories}/:sku`}
            render={({ match }) => <CategoryPage sku={match.params.sku} />}
        />
        <Redirect to={book.home} />
    </Switch>
);
