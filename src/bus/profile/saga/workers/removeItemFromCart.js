// Core
import { put, select } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';
import { getCart } from '../selectors';

// Api
// import { Api } from 'api';

export function* removeItemFromCartWorker({ payload }) {
    try {
        // updating user cart data in db
        // yield apply(Api, Api.profile.updateUserCart, [payload]);

        const currentCart = yield select(getCart);
        delete currentCart[payload];

        yield put(profileActions.updateCart({ ...currentCart }));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> removeItemFromCartWorker'));
    }
}
