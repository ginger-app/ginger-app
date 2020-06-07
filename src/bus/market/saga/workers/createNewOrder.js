// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

// Api
import { Api } from 'api';

// Instruments
import { Logger } from 'bus/utils';

export function* createNewOrderWorker({ payload: { orderData } }) {
    try {
        yield apply(Logger, Logger, ['log', 'Creating new order', JSON.stringify(orderData)]);

        const response = yield apply(Api, Api.market.createNewOrder, [orderData]);
        const result = yield apply(response, response.json);

        yield apply(Logger, Logger, [
            'log',
            'Creating new order response data',
            JSON.stringify(result),
        ]);

        if (response.status >= 400) throw new Error(result.message);

        yield put(uiActions.hideCart());
        yield put(profileActions.updateCart({}));
        console.log('Showing success popup');
    } catch (err) {
        yield apply(Logger, Logger, ['err', 'Creating new order err', err]);
        yield put(uiActions.emitError(err, '-> createNewOrderWorker'));
    }
}
