// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { authActions } from 'bus/auth/actions';

// Api
import { Api } from 'api';

export function* getGmapsKeyWorker() {
    try {
        const response = yield apply(Api, Api.app.getGoogleMapsKey);
        const { message, data } = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(message);

        yield put(authActions.fillGoogleMapsKey(data));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getGmapsKeyWorker'));
    }
}
