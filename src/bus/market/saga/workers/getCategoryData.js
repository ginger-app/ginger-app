// Core
import { put, apply } from 'redux-saga/effects';

// Actions
import { marketActions } from 'bus/market/market.actions';
import { uiActions } from 'bus/ui/ui.actions';

// Api
import { Api } from 'api';

// Instruments

export function* getCategoryDataWorker({ payload: { id } }) {
    try {
        const response = yield apply(Api, Api.market.getCategoryData, [id]);
        const { items, filteringOptions, image, _id, name, message } = yield apply(
            response,
            response.json,
        );

        if (response.status >= 400) throw new Error(message);

        yield put(
            marketActions.fillMarketCategoryData({ items, filteringOptions, image, _id, name }),
        );
    } catch (err) {
        yield put(uiActions.emitError(err, '-> getCategoryDataWorker'));
    }
}
