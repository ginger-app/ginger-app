// Core
import { createStore, combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// Reducers
import { authReducer as auth } from 'bus/auth/auth.reducer';
import { uiReducer as ui } from 'bus/ui/ui.reducer';
import { profileReducer as profile } from 'bus/profile/profile.reducer';
import { marketReducer as market } from 'bus/market/market.reducer';
import { newsReducer as news } from 'bus/app/news/reducer';
import { historyReducer as history } from 'bus/app/history/reducer';
import { bonusesReducer as bonuses } from 'bus/app/bonuses/reducer';
import { leaderboardReducer as leaderboard } from 'bus/app/leaderboard/reducer';
import { tournamentsReducer as tournaments } from 'bus/app/tournaments/reducer';
import { advertisementsReducer as advertisements } from 'bus/app/advertisements/reducer';
import { statisticsReducer as statistics } from 'bus/app/statistics/reducer';
import { gamesReducer as games } from 'bus/app/games/reducer';

// Store
import { store } from '../store';

const referenceRootReducer = combineReducers({
    router,
    profile,
    auth,
    ui,
    news,
    history,
    bonuses,
    leaderboard,
    tournaments,
    advertisements,
    market,
    statistics,
    games,
});

const referenceStore = createStore(referenceRootReducer);

describe('store: ', () => {
    test('should have valid state shape', () => {
        expect(store.getState()).toEqual(referenceStore.getState());
    });
});
