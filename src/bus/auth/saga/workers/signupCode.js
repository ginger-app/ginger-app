// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { Api } from '../../../../api';
import { history } from '../../../init/middleware/core';

// Actions
// import { authActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../actions';

export function* signupCodeWorker({ payload: phoneNumber }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.auth.getSignupCode, [
            // removing all spaces from phone number
            phoneNumber.split(' ').join(''),
        ]);
        const result = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(result.message);

        yield put(authActions.openCodeConfirmation());
    } catch (err) {
        if (err.message === 'User already exists') {
            yield apply(history, history.push, ['/signin']);
            // here we should probably show some toaster
        }
        yield put(uiActions.emitError(err, '-> signupWorker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
