import {
	GET_RESULTS,
	GET_RESULTS_SUCCESS,
	GET_RESULTS_FAILURE,
	INVALID_INPUT,
} from './actions';

const initialState = {
	isPending: false,
	hasInvalidInput: false,
	requestStatus: 200,
	items: [],
};

export default function resultReducer (state = initialState, action) {
	switch (action.type) {
		case GET_RESULTS:
			return { ...state, items: [], isPending: true, hasInvalidInput: false };

		case GET_RESULTS_SUCCESS:
			return { ...state, ...action.payload, isPending: false, hasInvalidInput: false };

		case GET_RESULTS_FAILURE:
			return { ...state, ...action.payload, items: [], isPending: false, hasInvalidInput: false };

		case INVALID_INPUT:
			return { ...state, isPending: false, hasInvalidInput: true };
	}

	return state;
}
