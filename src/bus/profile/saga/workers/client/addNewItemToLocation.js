// Core
import { put, apply, select } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';

// Instruments
import { ErrorHandler } from 'bus/utils';
import { getLocationsData, getChosenSupplierData } from '../../selectors';

// Api
import { Api } from 'api';
import { profileActions } from 'bus/profile/actions';

export function* addNewItemToLocationWorker({ payload }) {
    try {
        const locationsData = yield select(getLocationsData);
        const supplierData = yield select(getChosenSupplierData);

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
        yield put(
            profileActions.setChosenSupplierDataAsync({ supplierData, itemId: payload.itemId }),
        );
    } catch (err) {
        yield put(uiActions.emitError(err, '-> addNewItemToLocationWorker'));
    }
}
