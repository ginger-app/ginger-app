// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { marketActions } from 'bus/market/market.actions';
import { uiActions } from 'bus/ui/actions';

// Api
import { Api } from 'api';

// Instruments
import { Logger } from 'bus/utils';

export function* getSubcategoryDataWorker({ payload: { id } }) {
    try {
        yield apply(Logger, Logger, ['log', 'Fetching subcategory data', id]);

        const response = yield apply(Api, Api.market.getSubcategoryData, [id]);
        const { data, message } = yield apply(response, response.json);

        yield apply(Logger, Logger, ['log', 'Subcategory data fetched']);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillMarketSubcategoryData(data));
    } catch (err) {
        yield apply(Logger, Logger, ['err', 'Fetching subcategory data err', id, err]);

        yield put(uiActions.emitError(err, '-> getSubcategoryDataWorker'));
    }
}
