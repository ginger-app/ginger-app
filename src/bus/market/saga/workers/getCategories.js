// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { marketActions } from 'bus/market/market.actions';
import { uiActions } from 'bus/ui/ui.actions';

// Api
import { Api } from 'api';

// Instruments

export function* getCategoriesWorker() {
    try {
        const response = yield apply(Api, Api.market.getAllCategories);
        const { message, data } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillMarketCategories(data));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getCategoriesWorker'));
    }
}
