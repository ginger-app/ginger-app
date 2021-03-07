// Core
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Actions
import { profileActions } from 'bus/profile/actions';
// import { authActions } from 'bus/auth/actions';
import { PublicRoutes } from './routes';

// Instruments
import useVH from 'react-viewport-height';

export const App = () => {
    const dispatch = useDispatch();
    useVH();

    useEffect(() => {
        dispatch(profileActions.getUserDataAsync());
    }, [dispatch]);

    return <PublicRoutes />;
};
