//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import {
    ProfilePage,
    HomePage,
    CategoryPage,
    SubcategoryPage,
    MarketPage,
    ProductPage,
} from 'pages';

// Instruments
import { book } from 'core';

export const PublicRoutes = () => (
    <Switch>
        <Route exact path={book.profile} component={ProfilePage} />
        <Route exact path={book.home} component={HomePage} />
        <Route exact path={book.market} component={MarketPage} />
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
        <Route
            exact
            path={`${book.categories}/:categorySku/:sku`}
            render={({ match }) => <SubcategoryPage sku={match.params.sku} />}
        />
        <Route
            exact
            path={`${book.categories}/:categorySku/:subcategorySku/:sku`}
            render={({ match }) => <ProductPage sku={match.params.sku} />}
        />
        <Redirect to={`${book.home}?404`} />
    </Switch>
);
