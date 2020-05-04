// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { marketActions } from 'bus/market/actions';

// Api
import { Api } from 'api';

export function* getProductDataWorker({ payload: { sku } }) {
    try {
        const response = yield apply(Api, Api.market.getProductData, [sku]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillProductData(data));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getProductDataWorker'));
    }
}
