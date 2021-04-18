// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { marketActions } from 'bus/market/market.actions';

// Api
import { Api } from 'api';

// Instruments
import { Logger } from 'bus/utils';

export function* getProductDataWorker({ payload: { id } }) {
    try {
        const response = yield apply(Api, Api.market.getProductData, [id]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillProductData(data));
    } catch (err) {
        yield apply(Logger, Logger, ['err', 'Fetching product data err', id, err]);

        yield put(uiActions.emitError(err, '-> getProductDataWorker'));
    }
}
