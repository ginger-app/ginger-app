// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import { uiReducer as ui } from '../ui/reducer';
import { authReducer as auth } from '../auth/reducer';
import { profileReducer as profile } from '../profile/reducer';
import { marketReducer as market } from '../market/reducer';

export const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        profile,
        market,
        auth,
        ui,
    });
