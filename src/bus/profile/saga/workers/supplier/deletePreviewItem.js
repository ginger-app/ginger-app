// Core
import { put, select } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';
import { profileActions } from 'bus/profile/profile.actions';

// Instruments
//
import { getPreviewData } from '../../selectors';

// Api
// import { Api } from 'api';

export function* deletePreviewItemWorker({ payload }) {
    try {
        const previewData = yield select(getPreviewData);

        const newPreviewData = yield previewData.filter((item, index) => index !== payload);

        // const response = yield apply(Api, Api.group.method, []);
        // const { data, message } = yield apply(response, response.json);

        // if (response.status >= 400) {
        //
        // throw new Error(response.message);
        // }

        yield put(profileActions.updatePreviewData(newPreviewData));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> deletePreviewItemWorker'));
    }
}
