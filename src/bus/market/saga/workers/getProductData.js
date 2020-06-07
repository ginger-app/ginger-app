// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { marketActions } from 'bus/market/actions';

// Api
import { Api } from 'api';

// Instruments
import { Logger } from 'bus/utils';

export function* getProductDataWorker({ payload: { sku } }) {
    try {
        yield apply(Logger, Logger, ['log', 'Fetching product data', sku]);

        const response = yield apply(Api, Api.market.getProductData, [sku]);
        const { data, message } = yield apply(response, response.json);

        yield apply(Logger, Logger, ['log', 'Product data fetched ']);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillProductData(data));
    } catch (err) {
        yield apply(Logger, Logger, ['err', 'Fetching product data err', sku, err]);

        yield put(uiActions.emitError(err, '-> getProductDataWorker'));
    }
}
