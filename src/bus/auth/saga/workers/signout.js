//Core
import { put, apply } from 'redux-saga/effects';

//Instruments
import { profileActions } from '../../../profile/actions';
import { authActions } from '../../actions';

export function* logout() {
    //? maybe we should add disabling token functionality on backend?
    //? if so -> add try..catch

    yield put(authActions.logout());
    yield put(profileActions.clearProfile());
}
