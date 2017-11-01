import moment from 'moment';

import {
	FLY_FROM_CHANGE, FLY_TO_CHANGE,
	DATE_FROM_CHANGE, DATE_TO_CHANGE
} from './actions';

const initialState = {
	flyFrom: '',
	flyTo: '',
	dateFrom: new Date(),
	dateTo: moment().add(7, 'days').toDate(),
};

export default function formReducer (state = initialState, action) {
	switch (action.type) {
		case FLY_FROM_CHANGE:
			return { ...state, flyFrom: action.locationId };

		case FLY_TO_CHANGE:
			return { ...state, flyTo: action.locationId };

		case DATE_FROM_CHANGE:
			return { ...state, dateFrom: action.date };

		case DATE_TO_CHANGE:
			return { ...state, dateTo: action.date };
	}

	return state;
}
