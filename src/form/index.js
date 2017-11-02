import React from 'react';
import { connect } from 'react-redux';
import { DateInput } from '@blueprintjs/datetime';
import moment from 'moment';

import LocationInput from './LocationInput';
import { changeFlyFrom, changeFlyTo, changeDateFrom, changeDateTo } from './actions';

function mapStateToProps (state) {
	return {
		form: state.form,
	};
}

@connect(mapStateToProps)
export default class SearchForm extends React.PureComponent {
	_handleFlyFromChange = (locationId: string) => {
		this.props.dispatch(changeFlyFrom(locationId));
	}

	_handleFlyToChange = (locationId: string) => {
		this.props.dispatch(changeFlyTo(locationId));
	}

	_handleDateFromChange = (date: Date) => {
		this.props.dispatch(changeDateFrom(date));
	}

	_handleDateToChange = (date: Date) => {
		this.props.dispatch(changeDateTo(date));
	}

	render () {
		const { flyFrom, flyTo, dateFrom, dateTo } = this.props.form;

		return (
			<form className="pt-card container search-form" onSubmit={this._handleSubmit}>
				<label className="pt-label pt-inline">
					<span className="label-text">Odkud</span>

					<LocationInput
						onChange={this._handleFlyFromChange}
					/>
				</label>

				<label className="pt-label pt-inline">
					<span className="label-text">Kam</span>

					<LocationInput
						onChange={this._handleFlyToChange}
					/>
				</label>

				<label className="pt-label pt-inline">
					<span className="label-text">Odlet</span>

					<DateInput
						format="D.MM.YYYY"
						value={dateFrom}
						maxDate={dateTo}
						onChange={this._handleDateFromChange}
					/>
				</label>

				<label className="pt-label pt-inline">
					<span className="label-text">Návrat</span>

					<DateInput
						format="D.MM.YYYY"
						value={dateTo}
						minDate={dateFrom}
						onChange={this._handleDateToChange}
					/>
				</label>
			</form>
		);
	}
}
