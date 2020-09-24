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
