// Core
import { put } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

export function* repeatLastOrderWorker({ payload: { userCart, address } }) {
    try {
        yield put(profileActions.updateCart(userCart));

        console.log(address);
    } catch (err) {
        yield put(uiActions.emitError(err, '-> repeatLastOrderWorker'));
    }
}
