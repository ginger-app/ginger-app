// Core
import { put, apply, select } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';

// Instruments
import { ErrorHandler } from 'bus/utils';
import { getDeliveryDate } from 'bus/profile/saga/selectors';

// Api
import { Api } from 'api';

export function* getOrdersCombinationsWorker({ payload }) {
    try {
        const deliveryDate = yield select(getDeliveryDate);

        const response = yield apply(Api, Api.orders.getOrdersOffers, [
            { ...payload, deliveryDate: deliveryDate.utc },
        ]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) {
            yield apply(ErrorHandler, ErrorHandler, [response]);
            throw new Error(message);
        }

        yield put(uiActions.setOrderCombinations(data));
        yield put(uiActions.showOrderCombinationsOverlay());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getOrdersCombinationsWorker'));
    }
}
