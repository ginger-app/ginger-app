// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

// Instruments
import { ErrorHandler } from 'bus/utils';

// Api
import { Api } from 'api';

export function* addNewSupplierItemWorker({ payload }) {
    try {
        const response = yield apply(Api, Api.supplier.addnewSupplierItem, [payload]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) {
            yield apply(ErrorHandler, ErrorHandler, [response]);
            throw new Error(message);
        }

        yield put(profileActions.fillProfile(data));
        yield put(uiActions.hideNewListItemOverlay());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> addNewSupplierItemWorker'));
    }
}
