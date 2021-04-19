//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import {
    ProfilePage,
    HomePage,
    CategoryPage,
    MarketPage,
    ProductPage,
    OrdersPage,
    OrderDetailsPage,
    ListsPage,
    NewOrderPage,
    CartPage,
    LocationsListPage,
    SupplierConditions,
    SupplierListPage,
} from 'pages';

// Instruments
import { book } from 'core';
import { ClientEditProfile } from 'domains/client/pages';
import { SupplierEditProfile, SupplierOrdersPage } from 'domains/supplier/pages';

export const PublicRoutes = () => (
    <Switch>
        {/* App general */}
        <Route exact path={book.home} component={HomePage} />

        {/* Market */}
        <Route exact path={book.market} component={MarketPage} />
        <Route
            exact
            path={`${book.orders}/:id`}
            render={({ match }) => <OrderDetailsPage id={match.params.id} />}
        />

        <Route
            exact
            path={`${book.categories}/:id`}
            render={({ match }) => <CategoryPage id={match.params.id} />}
        />
        <Route
            exact
            path={`${book.categories}/:categorySku/:subcategorySku/:id`}
            render={({ match }) => <ProductPage id={match.params.id} />}
        />
        <Route
            exact
            path='/products/:id'
            render={({ match }) => <ProductPage id={match.params.id} />}
        />

        {/* Customer specific */}
        <Route exact path={book.clientProfile} component={ProfilePage} />
        <Route exact path={book.clientEdit} component={ClientEditProfile} />
        <Route exact path={book.orders} component={OrdersPage} />
        <Route exact path={book.newOrder} component={NewOrderPage} />
        <Route exact path={book.lists} component={ListsPage} />
        <Route exact path={book.locationsList} component={LocationsListPage} />
        <Route
            exact
            path={`${book.newOrder}/:locationId`}
            render={({ match }) => <CartPage locationId={match.params.locationId} />}
        />

        {/* Supplier specific */}
        <Route exact path={book.supplierProfile} component={ProfilePage} />
        <Route exact path={book.supplierEdit} component={SupplierEditProfile} />
        <Route exact path={book.deliveryConditions} component={SupplierConditions} />
        <Route exact path={book.supplierLists} component={SupplierListPage} />
        <Route exact path={book.supplierOrders} component={SupplierOrdersPage} />

        <Redirect
            to={{
                pathname: book.home,
                state: {
                    is404: true,
                },
            }}
        />
    </Switch>
);
