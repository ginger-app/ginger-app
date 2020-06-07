// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

// Api
import { Api } from 'api';

// Instruments
import { Logger } from 'bus/utils';

export function* getCategoryDataWorker({ payload: { sku } }) {
    try {
        yield apply(Logger, Logger, ['log', 'Fetching category data', sku]);

        const response = yield apply(Api, Api.market.getCategoryData, [sku]);
        const { data, message } = yield apply(response, response.json);

        yield apply(Logger, Logger, ['log', 'Category data fetched']);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillMarketCategoryData(data));
    } catch (err) {
        yield apply(Logger, Logger, ['err', 'Fetching category data err', sku, err]);
        yield put(uiActions.emitError(err, '-> getCategoryDataWorker'));
    }
}
