import * as React from 'react';

export default class Header extends React.Component {
	render () {
		return (
			<nav className="pt-navbar pt-dark">
				<div className="pt-navbar-group pt-align-left">
					<div className="pt-navbar-heading">
						kiwithing
					</div>
				</div>

				<div className="pt-navbar-group pt-align-right">
					<button className="pt-button pt-minimal pt-icon-home">
						Home
					</button>
					<button className="pt-button pt-minimal pt-icon-help">
						About
					</button>
				</div>
			</nav>
		);
	}
}
