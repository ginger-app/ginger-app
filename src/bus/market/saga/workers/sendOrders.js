// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';

// Instruments
import { ErrorHandler } from 'bus/utils';
import { history } from 'bus/init/middleware/core';

// Api
import { Api } from 'api';

export function* sendOrdersWorker({ payload: { orders } }) {
    try {
        const response = yield apply(Api, Api.orders.createNewOrder, [orders]);
        // eslint-disable-next-line
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) {
            yield apply(ErrorHandler, ErrorHandler, [response]);
            throw new Error(message);
        }

        yield apply(history, history.push, ['/orders']);
    } catch (err) {
        yield put(uiActions.emitError(err, '-> sendOrdersWorker'));
    }
}
