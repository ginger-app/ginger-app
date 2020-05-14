// Core
import { put } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';

export function* ErrorHandler(res, options) {
    const { status, message } = res;

    switch (status) {
        case 401:
            return yield put(uiActions.showLoginOverlay());

        default:
            break;
    }
}
