import { put, take } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import testSaga from './sagas';
import { DATE_FROM_CHANGE, FLY_FROM_CHANGE } from './actions';
import { getResults, invalidInput } from './../result/actions';

test('saga should put `getResults` action', () => {
	const form = {
		flyFrom: 'aaa',
		flyTo: 'bbb',
		dateFrom: 'zitra',
		dateTo: 'pozitri',
	};

	return expectSaga(testSaga)
		.withState({ form })
		.put(getResults())
		.dispatch({ type: DATE_FROM_CHANGE })
		.run();
});

test('saga should put `invalidInput` action', () => {
	const form = {
		flyFrom: 'aaa',
		flyTo: '',
		dateFrom: 'zitra',
		dateTo: 'pozitri',
	};

	return expectSaga(testSaga)
		.withState({ form })
		.put(invalidInput())
		.dispatch({ type: FLY_FROM_CHANGE })
		.run();
});
