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
    OrdersPage,
    OrderDetailsPage,
    ListsPage,
    NewOrderPage,
    CartPage,
    LocationsListPage,
} from 'pages';

// Instruments
import { book } from 'core';

export const PublicRoutes = () => (
    <Switch>
        <Route exact path={book.profile} component={ProfilePage} />
        <Route exact path={book.home} component={HomePage} />
        <Route exact path={book.market} component={MarketPage} />
        <Route exact path={book.orders} component={OrdersPage} />
        <Route exact path={book.newOrder} component={NewOrderPage} />
        <Route exact path={book.lists} component={ListsPage} />
        <Route exact path={book.locationsList} component={LocationsListPage} />
        <Route
            exact
            path={`${book.orders}/:id`}
            render={({ match }) => <OrderDetailsPage id={match.params.id} />}
        />
        <Route
            exact
            path={`${book.newOrder}/:locationId`}
            render={({ match }) => <CartPage locationId={match.params.locationId} />}
        />
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
        <Route
            exact
            path='/products/:sku'
            render={({ match }) => <ProductPage sku={match.params.sku} />}
        />
        <Redirect to={`${book.home}?404`} />
    </Switch>
);
