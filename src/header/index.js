// @flow
import * as React from 'react';
import { Overlay, Button, Intent } from "@blueprintjs/core";

interface IState {
	isAboutOpen: boolean;
}

export default class Header extends React.Component<{}, IState> {
	state = {
		isAboutOpen: false,
	}

	_handleOpenAbout = () => this.setState({ isAboutOpen: true });
	_handleCloseAbout = () => this.setState({ isAboutOpen: false });

	render () {
		return (
			<nav className="pt-navbar pt-dark">
				<div className="pt-navbar-group pt-align-left">
					<div className="pt-navbar-heading">
						kiwithing
					</div>
				</div>

				<div className="pt-navbar-group pt-align-right">
					<button
						onClick={this._handleOpenAbout}
						className="pt-button pt-minimal pt-icon-help"
					>
						About
					</button>
				</div>

				<Overlay
					isOpen={this.state.isAboutOpen}
					onClose={this._handleCloseAbout}
				>
					<div className="pt-card pt-elevation-4 about-overlay pt-overlay-content">
                        <h3>Mistrovská ukázka</h3>
                        <p>
                            Bylo vytvořeno Štěpánem Skovajsou pro vyšší dobro.
                        </p>
                        <p>
                            Nevím, co více sem napsat.
                        </p>
						<p>
                            Takže nějaký vtip na závěr:
                        </p>
						<blockquote>
							Co dělá lenochod, když hoří les?
							.
							.
							Hoří taky.
						</blockquote>
                        <br />
                        <Button intent={Intent.DANGER} onClick={this._handleCloseAbout}>
                            Close
                        </Button>
                    </div>
				</Overlay>
			</nav>
		);
	}
}
