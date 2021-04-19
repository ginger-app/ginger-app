// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { marketActions } from 'bus/market/market.actions';

// Api
import { Api } from 'api';

// Instruments

export function* getProductDataWorker({ payload: { id } }) {
    try {
        const response = yield apply(Api, Api.market.getProductData, [id]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillProductData(data));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getProductDataWorker'));
    }
}
