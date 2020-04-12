//  Core
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

//  Pages
import { ProfilePage, MarketPage } from '../pages';

// Instruments
import { book } from './book';

export const Private = () => (
    <Switch>
        <Route path={book.profile} component={ProfilePage} />
        <Route path={book.market} component={MarketPage} />
        <Redirect to={book.market} />
    </Switch>
);
