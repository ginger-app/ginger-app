// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

// Api
// import { Api } from 'api';

export function* addItemToCartWorker({ payload }) {
    try {
        // updating user cart data in db
        // yield apply(Api, Api.profile.updateUserCart, [payload]);

        yield put(profileActions.addItemToCart(payload));
    } catch (error) {
        yield put(uiActions.emitError(error, '-> addItemToCartWorker'));
    }
}
