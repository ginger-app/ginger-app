// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { marketActions } from 'bus/market/actions';
import { uiActions } from 'bus/ui/actions';

// Api
import { Api } from 'api';

// Instruments
import { Logger } from 'bus/utils';

export function* getOrderDataWorker({ payload: { id } }) {
    try {
        const response = yield apply(Api, Api.market.getOrderData, [id]);
        const { message, data } = yield apply(response, response.json);
        if (response.status >= 400) throw new Error(message);

        yield put(marketActions.fillOrderData(data));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getOrderDataWorker'));
    }
}
