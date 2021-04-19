// Core
import { put, apply, select } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';

// Instruments

import { getDeliveryDate } from 'bus/profile/saga/selectors';

// Api
import { Api } from 'api';

export function* createNewOrderWorker({ payload: { items, location, sum } }) {
    try {
        const deliveryDate = yield select(getDeliveryDate);

        const response = yield apply(Api, Api.orders.createNewOrder, [
            { deliveryDate: deliveryDate.utc, items, location, sum },
        ]);
        const { message } = yield apply(response, response.json);

        if (response.status >= 400) {
            throw new Error(message);
        }
    } catch (err) {
        yield put(uiActions.emitError(err, '-> createNewOrderWorker'));
    }
}
