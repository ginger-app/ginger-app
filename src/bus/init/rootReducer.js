// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import { uiReducer as ui } from '../ui/reducer';
import { authReducer as auth } from '../auth/reducer';

export const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        // profile,
        auth,
        ui,
    });
