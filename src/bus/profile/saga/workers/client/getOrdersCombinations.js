// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';

// Instruments
import { ErrorHandler } from 'bus/utils';

// Api
import { Api } from 'api';

export function* getOrdersCombinationsWorker({ payload }) {
    try {
        const response = yield apply(Api, Api.orders.getOrdersOffers, [payload]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) {
            yield apply(ErrorHandler, ErrorHandler, [response]);
            throw new Error(message);
        }

        console.log(data);
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getOrdersCombinationsWorker'));
    }
}
