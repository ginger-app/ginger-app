// Core
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Actions
import { profileActions } from 'bus/profile/actions';
import { uiActions } from 'bus/ui/actions';
// import { authActions } from 'bus/auth/actions';
import { PublicRoutes } from './routes';

// Instruments
import useVH from 'react-viewport-height';

export const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    useVH();

    useEffect(() => {
        dispatch(profileActions.getUserDataAsync());
    }, [dispatch]);

    return <PublicRoutes />;
};
