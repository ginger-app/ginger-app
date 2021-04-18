// Core
import { put, apply, select } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';

// Instruments
import { ErrorHandler } from 'bus/utils';
import { history } from 'bus/init/middleware/core';
import { getDeliveryDate } from 'bus/market/saga/selectors';

// Api
import { Api } from 'api';

export function* sendOrdersWorker({ payload: { orders } }) {
    try {
        const deliveryDate = yield select(getDeliveryDate);

        const response = yield apply(Api, Api.orders.createNewOrder, [
            orders.map((item) => ({ ...item, deliveryDate: deliveryDate.utc })),
        ]);
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
