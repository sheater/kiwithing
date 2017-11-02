// @flow
import * as React from 'react';
import { Provider } from 'react-redux';

import Header from './header';
import Form from './form';
import Result from './result';

import storeConfig from './store';

export default class Main extends React.Component<{}> {
	_store = null;

	componentWillMount (): void {
		this._store = storeConfig();
	}

	render () {
		return (
			<Provider store={this._store}>
				<div className="layout">
					<Header />
					<Form />
					<Result />
				</div>
			</Provider>
		);
	}
}
