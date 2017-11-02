import reducer from './reducer';
import {
	DATE_FROM_CHANGE, DATE_TO_CHANGE,
	FLY_FROM_CHANGE, FLY_TO_CHANGE
} from './actions';

const state = {
	flyFrom: 'brno',
	flyTo: 'praha',
	dateFrom: 'dnes',
	dateTo: 'zitra',
};

test('`fly from` changed', () => {
	const newState = reducer(state, { type: FLY_FROM_CHANGE, locationId: 'olomouc' });

	expect(newState.flyFrom).toBe('olomouc');
});

test('`fly to` changed', () => {
	const newState = reducer(state, { type: FLY_TO_CHANGE, locationId: 'liberec' });

	expect(newState.flyTo).toBe('liberec');
});

test('`date from` changed', () => {
	const newState = reducer(state, { type: DATE_FROM_CHANGE, date: 'zitra' });

	expect(newState.dateFrom).toBe('zitra');
});

test('`date to` changed', () => {
	const newState = reducer(state, { type: DATE_TO_CHANGE, date: 'pozitri' });

	expect(newState.dateTo).toBe('pozitri');
});

test('nothing changed', () => {
	const newState = reducer(state, { type: 'uplne jina akce' });

	expect(newState).toEqual({
		flyFrom: 'brno',
		flyTo: 'praha',
		dateFrom: 'dnes',
		dateTo: 'zitra',
	});
});
