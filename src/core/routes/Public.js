//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { LoginPage, SignupPage, HomePage, CategoryPage, SubcategoryPage } from 'pages';

// Instruments
import { book } from 'core';

export const Public = () => (
    <Switch>
        {/* <Route exact path={book.signin} component={LoginPage} /> */}
        {/* <Route exact path={book.signup} component={SignupPage} /> */}
        <Route exact path={book.home} component={HomePage} />
        <Route
            exact
            path={`${book.categories}/:sku`}
            render={({ match }) => <CategoryPage sku={match.params.sku} />}
        />
        <Route
            exact
            path={`${book.categories}/:categorySku/:sku`}
            render={({ match }) => <SubcategoryPage sku={match.params.sku} />}
        />
        <Redirect to={`${book.home}?404`} />
    </Switch>
);
