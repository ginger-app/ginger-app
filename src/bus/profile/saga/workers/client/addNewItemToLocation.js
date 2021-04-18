// Core
import { put, apply, select } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';

// Instruments
import { ErrorHandler } from 'bus/utils';
import { getLocationsData } from '../../selectors';

// Api
import { Api } from 'api';
import { profileActions } from 'bus/profile/profile.actions';

export function* addNewItemToLocationWorker({ payload }) {
    try {
        const locationsData = yield select(getLocationsData);

        const response = yield apply(Api, Api.client.addNewItemToLocation, [payload]);
        const { data, message } = yield apply(response, response.json);

        if (response.status >= 400) {
            yield apply(ErrorHandler, ErrorHandler, [response]);
            throw new Error(message);
        }
        const updatedLocations = locationsData.map((item) =>
            item._id === payload.locationId ? data : item,
        );

        yield put(profileActions.fillClientLocations(updatedLocations));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> addNewItemToLocationWorker'));
    }
}
