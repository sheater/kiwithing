import * as React from 'react';
import { PropTypes as P } from 'prop-types';

export default class ItemPreview extends React.Component {
	render () {
		const { item } = this.props;

		const href = 'https://www.kiwi.com/cz/booking?passengers=1-0-0&token=' + item.bookingToken;

		return (
			<div className="pt-card pt-elevation-0 pt-interactive result-item">
				<h5><a href={href} target="_blank">{item.from} - {item.to}</a></h5>
				<p>{item.departureTime} - {item.arrivalTime}</p>
				<p>{item.duration}</p>
				<p>{item.airlines}</p>
			</div>
		);
	}
}
