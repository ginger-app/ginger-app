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
    SupplierConditions,
    SupplierListPage,
    SupplierOrdersPage,
} from 'pages';

// Instruments
import { book } from 'core';

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
            path={`${book.categories}/:categorySku/:id`}
            render={({ match }) => <SubcategoryPage id={match.params.id} />}
        />
        <Route
            exact
            path={`${book.categories}/:categorySku/:id`}
            render={({ match }) => <SubcategoryPage id={match.params.id} />}
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

        {/* Profile */}
        <Route exact path={book.profile} component={ProfilePage} />

        {/* Customer specific */}
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
        <Route exact path={book.deliveryConditions} component={SupplierConditions} />
        <Route exact path={book.supplierLists} component={SupplierListPage} />
        <Route exact path={book.supplierOrders} component={SupplierOrdersPage} />

        <Redirect to={`${book.home}?404`} />
    </Switch>
);
