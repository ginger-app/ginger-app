// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

// Api
import { Api } from 'api';

// Instruments
import { Logger } from 'bus/utils';

export function* getCategoriesWorker() {
    try {
        yield apply(Logger, Logger, ['log', 'Fetching categories']);

        const response = yield apply(Api, Api.market.getAllCategories);
        const { message, data } = yield apply(response, response.json);

        yield apply(Logger, Logger, ['log', 'Categories fetched', `Data length: ${data.length}`]);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillMarketCategories(data));
    } catch (err) {
        yield apply(Logger, Logger, ['err', 'Fetching categories err', err]);
        yield put(uiActions.emitError(err, '-> getCategoriesWorker'));
    }
}
