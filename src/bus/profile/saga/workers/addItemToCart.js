// Core
import { put, select } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';
import { getCart } from '../selectors';

// Api
// import { Api } from 'api';

export function* addItemToCartWorker({ payload }) {
    try {
        // updating user cart data in db
        // yield apply(Api, Api.users.updateUserCart, [payload]);

        const currentCart = yield select(getCart);

        yield put(
            profileActions.updateCart({
                ...currentCart,
                [payload.id]: payload,
            }),
        );
        yield put(uiActions.showCartIcon());
    } catch (error) {
        yield put(uiActions.emitError(error, '-> addItemToCartWorker'));
    }
}
