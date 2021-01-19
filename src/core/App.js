// Core
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { profileActions } from 'bus/profile/actions';
import { uiActions } from 'bus/ui/actions';
// import { authActions } from 'bus/auth/actions';
import { PublicRoutes } from './routes';

export const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(profileActions.getUserDataAsync());

        // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
        const vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, [dispatch]);

    useEffect(() => {
        history.listen(() => history.action === 'POP' && dispatch(uiActions.hideAllOverlays()));
    }, [dispatch, history]);

    return <PublicRoutes />;
};
