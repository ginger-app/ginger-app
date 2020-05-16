// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

export function* repeatLastOrderWorker({ payload: { userCart, address, deliveryTime } }) {
    try {
        yield put(profileActions.updateCart(userCart));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> repeatLastOrderWorker'));
    }
}
