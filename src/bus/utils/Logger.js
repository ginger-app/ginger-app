// Core
import { put } from 'redux-saga/effects';

// Actions
import { uiActions } from 'bus/ui/ui.actions';

export function* Logger(type, ...data) {
    const concatenated = data.join(' -> ');

    switch (type) {
        case 'warn':
            return yield put(
                uiActions.writeLog(
                    `[WARN][${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}] => ${concatenated}\n`,
                ),
            );

        case 'err':
            return yield put(
                uiActions.writeLog(
                    `[ERR][${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}] => ${concatenated}\n`,
                ),
            );

        default:
            return yield put(
                uiActions.writeLog(
                    `[LOG][${new Date().toLocaleDateString()}, ${new Date().toLocaleTimeString()}] => ${concatenated}\n`,
                ),
            );
    }
}
