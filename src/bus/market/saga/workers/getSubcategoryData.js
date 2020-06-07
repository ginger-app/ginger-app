// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

// Api
import { Api } from 'api';

// Instruments
import { Logger } from 'bus/utils';

export function* getSubcategoryDataWorker({ payload: { sku } }) {
    try {
        yield apply(Logger, Logger, ['log', 'Fetching subcategory data', sku]);

        const response = yield apply(Api, Api.market.getSubcategoryData, [sku]);
        const { data, message } = yield apply(response, response.json);

        yield apply(Logger, Logger, ['log', 'Subcategory data fetched']);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillMarketSubcategoryData(data));
    } catch (err) {
        yield apply(Logger, Logger, ['err', 'Fetching subcategory data err', sku, err]);

        yield put(uiActions.emitError(err, '-> getSubcategoryDataWorker'));
    }
}
