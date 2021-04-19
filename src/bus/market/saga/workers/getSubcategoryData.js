// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { marketActions } from 'bus/market/market.actions';
import { uiActions } from 'bus/ui/ui.actions';

// Api
import { Api } from 'api';

// Instruments

export function* getSubcategoryDataWorker({ payload: { id } }) {
    try {
        const response = yield apply(Api, Api.market.getSubcategoryData, [id]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillMarketSubcategoryData(data));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getSubcategoryDataWorker'));
    }
}
