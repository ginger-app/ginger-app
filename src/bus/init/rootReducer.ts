// Core
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

// Reducers
import { uiReducer as ui } from 'bus/ui/ui.reducer';
import { authReducer as auth } from 'bus/auth/auth.reducer';
import { profileReducer as profile } from 'bus/profile/profile.reducer';
import { marketReducer as market } from 'bus/market/market.reducer';

export const rootReducer = (history: History<any>) =>
    combineReducers({
        router: connectRouter(history),
        profile,
        market,
        auth,
        ui,
    });

export type AppState = ReturnType<ReturnType<typeof rootReducer>>;
