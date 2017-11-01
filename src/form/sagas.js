import { takeEvery, select, put } from 'redux-saga/effects';

import { FLY_FROM_CHANGE, FLY_TO_CHANGE, DATE_FROM_CHANGE, DATE_TO_CHANGE } from './actions';
import { getResults, invalidInput } from './../result/actions';

function* onChange () {
	const { flyFrom, flyTo, dateFrom, dateTo } = yield select((state) => state.form);

	// pokud neni vse vyplneno, nema cenu nic hledat
	if (flyFrom && flyTo && dateFrom && dateTo) {
		// zavolame request na vysledky vyhledavani
		yield put(getResults());
	}
	else {
		// informujeme uzivatele, ze formular spatne vyplnil
		yield put(invalidInput());
	}
}

export default function* watchChange () {
	yield takeEvery([
		FLY_FROM_CHANGE,
		FLY_TO_CHANGE,
		DATE_FROM_CHANGE,
		DATE_TO_CHANGE,
	], onChange);
}
