// Core
import { put, apply } from 'redux-saga/effects';

// Instruments
import { Api } from '../../../../api';
import { history } from '../../../init/middleware/core';

// Actions
// import { authActions } from '../../actions';
import { uiActions } from '../../../ui/actions';
import { profileActions } from '../../../profile/actions';
import { authActions } from '../../actions';

export function* codeConfirmationWorker({ payload: { phoneNumber, code } }) {
    try {
        yield put(uiActions.startFetching());

        const response = yield apply(Api, Api.auth.confirmAuthenticationCode, [
            {
                // removing all spaces from phone number
                phoneNumber: phoneNumber.split(' ').join(''),
                code,
            },
        ]);
        const result = yield apply(response, response.json);

        if (response.status >= 400) throw new Error(result.message);

        yield put(profileActions.fillProfile(result.userData));
        yield put(authActions.authenticate());
        yield put(authActions.closeLoginCodeConfirmation());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> codeConfirmationWorker'));
    } finally {
        yield put(uiActions.stopFetching());
    }
}
