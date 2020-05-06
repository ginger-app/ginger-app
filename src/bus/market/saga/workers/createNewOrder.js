// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/actions';

// Api
import { Api } from 'api';

export function* createNewOrderWorker() {
    try {
        // test order placement
        const mockOrder = {
            sum: 1000.5,
            userCart: {},
            address: 'Kyiv, Pivnichna str., 6',
        };

        const response = yield apply(Api, Api.market.createNewOrder, [mockOrder]);
        const result = yield apply(response, response.json);

        console.log(result);
        if (response.status >= 400) throw new Error(result.message);
    } catch (err) {
        yield put(uiActions.emitError(err, '-> createNewOrderWorker'));
    }
}
