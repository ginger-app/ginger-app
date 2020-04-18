// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

// Api
import { Api } from 'api';

export function* getCategoryDataWorker({ payload: { sku } }) {
    try {
        const response = yield apply(Api, Api.market.getCategoryData, [sku]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillMarketCategoryData(data));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getCategoryDataWorker'));
    }
}
