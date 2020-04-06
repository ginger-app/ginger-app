// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { Api } from '../../../../api';
import { history } from '../../../init/middleware/core';

// Actions
// import { authActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { authActions } from '../../actions';

export function* signinWorker({ payload: phoneNumber }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.auth.getAuthenticationCode, [
            // removing all spaces from phone number
            phoneNumber.split(' ').join(''),
        ]);
        const result = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(result.message);

        // yield apply(history, history.push, ['/signin/confirmation']);
        yield put(authActions.openLoginCodeConfirmation());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> signinWorker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
