// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

// Reducers
import { uiReducer as ui } from 'bus/ui/reducer';
import { authReducer as auth } from 'bus/auth/auth.reducer';
import { profileReducer as profile } from 'bus/profile/profile.reducer';
import { marketReducer as market } from 'bus/market/market.reducer';

export const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        profile,
        market,
        auth,
        ui,
    });
