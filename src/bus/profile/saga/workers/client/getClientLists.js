// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

// Instruments

// Api
import { Api } from 'api';

export function* getClientListsWorker() {
    try {
        const response = yield apply(Api, Api.client.getClientLists);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) {
            throw new Error(message);
        }

        yield put(profileActions.fillClientLists(data));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getClientListsWorker'));
    }
}
