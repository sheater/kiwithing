import { put, call, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import moment from 'moment';

import { GET_RESULTS, GET_RESULTS_SUCCESS, GET_RESULTS_FAILURE } from './actions';

function* getResults () {
	try {
		const { flyFrom, flyTo, dateFrom, dateTo } = yield select((state) => state.form);

		const departureDate = moment(dateFrom).format('DD/MM/YYYY');
		const returnDate = moment(dateTo).format('DD/MM/YYYY');

		const params = {
			v: '2',
			locale: 'cz',
			flyFrom,
			to: flyTo,
			dateFrom: departureDate,
			dateTo: departureDate,
			returnFrom: returnDate,
			returnTo: returnDate,
		};

		// zavolame request
		const { data, status } = yield call(axios.get, 'https://api.skypicker.com/flights', { params });

		// transformujeme data do podoby, ktera se nam libi
		const items = data.data.map((item) => {
			const {
				id, booking_token,
				cityFrom, cityTo,
				flyFrom, flyTo,
				aTime, dTime,
				distance, fly_duration, airlines
			} = item;

			return {
				id,
				bookingToken: booking_token,
				from: `${cityFrom} (${flyFrom})`,
				to: `${cityTo} (${flyTo})`,
				departureTime: moment.unix(dTime).format('DD.MM. H:mm'),
				arrivalTime: moment.unix(aTime).format('DD.MM. H:mm'),
				duration: fly_duration,
				airlines: airlines.join(', ')
			};
		});

		yield put({
			type: GET_RESULTS_SUCCESS,
			payload: {
				items,
				requestStatus: status,
			}
		});
	}
	catch (error) {
		// muze se jednat o jinou chybu, nez chybu requestu (napr. TypeError)
		if (!error.response) {
			throw error;
		}

		yield put({
			type: GET_RESULTS_FAILURE,
			payload: {
				requestStatus: error.response.status,
			}
		});
	}
}

export default function* watchGetResults () {
	yield takeLatest(GET_RESULTS, getResults);
}
