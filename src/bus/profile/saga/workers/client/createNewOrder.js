// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';

// Instruments
import { ErrorHandler } from 'bus/utils';

// Api
import { Api } from 'api';

export function* createNewOrderWorker({ payload: { deliveryDate, items, location, sum } }) {
    try {
        const response = yield apply(Api, Api.orders.createNewOrder, [
            { deliveryDate, items, location, sum },
        ]);
        const { message } = yield apply(response, response.json);

        if (response.status >= 400) {
            yield apply(ErrorHandler, ErrorHandler, [response]);
            throw new Error(message);
        }
    } catch (err) {
        yield put(uiActions.emitError(err, '-> createNewOrderWorker'));
    }
}
