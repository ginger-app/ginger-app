// Core
import { put, select } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';
import { profileActions } from 'bus/profile/actions';

// Instruments
import { getLocationsData } from '../../selectors';

export function* setChosenSupplierDataWorker({ payload: { supplierData, itemId } }) {
    try {
        yield put(profileActions.setChosenSupplierData(supplierData)); // Supplier data

        const locationsData = yield select(getLocationsData);

        const locationsContainingSupplier = locationsData.map(
            ({ _id, itemsList, locationName }) => ({
                _id,
                locationName,
                chosen: Boolean(
                    itemsList.filter(
                        (item) => item.supplierId === supplierData._id && itemId === item.itemId,
                    ).length,
                ),
            }),
        );

        // Filtering current user location to find where user has current market item with current supplier selected
        yield put(profileActions.fillMarketItemChosenLocations(locationsContainingSupplier));
    } catch (err) {
        yield put(uiActions.emitError(err, '-> setChosenSupplierDataWorker'));
    }
}
