// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

// Api
import { Api } from 'api';

export function* addItemToFavoritesWorker({ payload: { sku } }) {
    try {
        // Adding item locally to smooth UX
        yield put(profileActions.addItemToFavorites(sku));

        const response = yield apply(Api, Api.users.addItemToFavorites, [sku]);
        const { message } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);
    } catch (err) {
        // removing item if an error happened
        yield put(profileActions.removeItemFromFavorites(sku));
        yield put(uiActions.emitError(err, '-> addItemToFavorites worker'));
    }
}
