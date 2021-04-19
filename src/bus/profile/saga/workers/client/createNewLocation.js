// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

// Instruments

// Api
import { Api } from 'api';

export function* createNewLocationWorker({ payload }) {
    try {
        const response = yield apply(Api, Api.client.createNewLocation, [payload]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) {
            throw new Error(message);
        }

        yield put(profileActions.fillClientLocations(data));
        yield put(uiActions.hideNewLocationOverlay());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> createNewLocationWorker'));
    }
}
