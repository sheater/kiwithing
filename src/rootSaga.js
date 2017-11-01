import { all } from 'redux-saga/effects';

import form from './form/sagas';
import result from './result/sagas';

export default function* rootSaga () {
	yield all([
		form(),
		result(),
	]);
}
