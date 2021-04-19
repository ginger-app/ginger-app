// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { marketActions } from 'bus/market/market.actions';

// Instruments

// Api
import { Api } from 'api';

export function* searchItemsByNameWorker({ payload: { itemName } }) {
    try {
        const response = yield apply(Api, Api.market.searchProductsByName, [itemName]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) {
            throw new Error(message);
        }

        yield put(marketActions.fillSearchResults(data));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> searchItemsByNameWorker'));
    }
}
