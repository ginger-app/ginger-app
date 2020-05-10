// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

// Api
import { Api } from 'api';

export function* createNewOrderWorker({ payload: { orderData } }) {
    try {
        const response = yield apply(Api, Api.market.createNewOrder, [orderData]);
        const result = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(result.message);

        yield put(uiActions.hideCart());
        yield put(profileActions.updateCart({}));
        console.log('Showing success popup');
    } catch (err) {
        yield put(uiActions.emitError(err, '-> createNewOrderWorker'));
    }
}
