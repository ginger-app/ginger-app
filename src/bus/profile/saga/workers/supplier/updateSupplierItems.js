// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

// Instruments

// Api
import { Api } from 'api';

export function* updateSupplierItemsWorker({ payload }) {
    try {
        const response = yield apply(Api, Api.supplier.updateSupplierItems, [payload]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) {
            throw new Error(message);
        }

        yield put(profileActions.fillProfile(data));
        yield put(uiActions.hideSupplierUploadOverlay());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> updateSupplierItemsWorker'));
    }
}
