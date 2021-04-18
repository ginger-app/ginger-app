// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

// Instruments
import { ErrorHandler } from 'bus/utils';

// Api
import { Api } from 'api';

export function* uploadExcelTableWorker({ payload: { file } }) {
    try {
        const response = yield apply(Api, Api.supplier.uploadExcelSheet, [file]);
        const { uploadPreview, message } = yield apply(response, response.json);

        if (response.status >= 400) {
            yield apply(ErrorHandler, ErrorHandler, [response]);
            throw new Error(message);
        }

        yield put(profileActions.fillSupplierPreview(uploadPreview));
        yield put(uiActions.showSupplierUploadPreviewOverlay());
    } catch (err) {
        yield put(uiActions.emitError(err, '-> uploadExcelTableWorker'));
    }
}
