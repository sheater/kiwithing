import * as React from 'react';
import { connect } from 'react-redux';

import ItemPreview from './ItemPreview';

function mapStateToProps (state) {
	return { result: state.result };
}

@connect(mapStateToProps)
export default class SearchResult extends React.PureComponent {
	state = {
		// pokud uzivatel doposud nic nezadal, nebudeme nic zobrazovat
		isDirty: false,
	};

	componentWillReceiveProps (nextProps) {
		// jakmile dojde k prvnimu hledani, zobrazujeme jiz vysledky, chyby, atd.
		if (nextProps.result.isPending) {
			this.setState({ isDirty: true });
		}
	}

	_renderItem = (item) => {
		return <ItemPreview key={item.id} item={item} />;
	}

	_renderErrorState () {
		return (
			<div className="pt-non-ideal-state">
				<div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
					<span className="pt-icon pt-icon-error"></span>
				</div>
				<h4 className="pt-non-ideal-state-title">Došlo k chybě</h4>
				<div className="pt-non-ideal-state-description">
					Sorry jako :(
				</div>
			</div>
		);
	}

	_renderInvalidInput () {
		return (
			<div className="pt-non-ideal-state">
				<div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
					<span className="pt-icon pt-icon-disable"></span>
				</div>
				<h4 className="pt-non-ideal-state-title">Neplatné zadání</h4>
				<div className="pt-non-ideal-state-description">
					Ve vyhledávacím formuláři je nějaká hodnota špatně vyplněna nebo nevyplněna
				</div>
			</div>
		);
	}

	_renderNoResults () {
		return (
			<div className="pt-non-ideal-state">
				<div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
					<span className="pt-icon pt-icon-info-sign"></span>
				</div>
				<h4 className="pt-non-ideal-state-title">Kde nic, tu nic</h4>
				<div className="pt-non-ideal-state-description">
					Bohužel se pro zvolená kritéria nepodařilo nic nalézt
				</div>
			</div>
		);
	}

	_renderSpinner () {
		return (
			<div className="result-spinner">
				<div className="pt-spinner pt-large">
					<div className="pt-spinner-svg-container">
						<svg viewBox="0 0 100 100">
							<path className="pt-spinner-track" d="M 50,50 m 0,-44.5 a 44.5,44.5 0 1 1 0,89 a 44.5,44.5 0 1 1 0,-89"></path>
							<path className="pt-spinner-head" d="M 94.5 50 A 44.5 44.5 0 0 0 50 5.5"></path>
						</svg>
					</div>
				</div>
			</div>
		);
	}

	_renderResult () {
		const { items, requestStatus, hasInvalidInput, isPending } = this.props.result;

		if (!this.state.isDirty) {
			return null;
		}

		if (hasInvalidInput) {
			return this._renderInvalidInput();
		}
		else if (isPending) {
			return this._renderSpinner();
		}
		else {
			if (requestStatus === 200) {
				if (items.length) {
					return items.map(this._renderItem);
				}
				else {
					return this._renderNoResults();
				}
			}
			else {
				return this._renderErrorState();
			}
		}
	}

	render () {
		return (
			<div className="container search-result">
				{this._renderResult()}
			</div>
		);
	}
}
