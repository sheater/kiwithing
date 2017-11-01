// @flow
import * as React from 'react';
import { Suggest } from '@blueprintjs/labs';
import { MenuItem } from "@blueprintjs/core";
import cx from 'classnames';
import pick from 'lodash/pick';
import axios from 'axios';

interface IProps {
	onChange?: (locationId: string) => void;
}

interface ILocation {
	id: string;
	value: string;
}

interface IState {
	isPending: boolean;
	isPopoverBlocked: boolean;
	items: Array<ILocation>;
}

export default class LocationInput extends React.PureComponent<IProps, IState> {
	state = {
		isPending: false, // NOTE: useless now
		isPopoverBlocked: true,
		items: [],
	};

	_itemRenderer = ({ handleClick, item }: any) => {
        return (
            <MenuItem
				key={item.id}
				onClick={handleClick}
                text={item.value}
            />
        );
	}

	_handleItemClick = (item: ILocation) => {
		const { onChange } = this.props;

		if (onChange) {
			onChange(item.id);
		}
	}

	_inputValueRenderer (item: ILocation) {
		return item.value;
	}

	async _loadSuggestions (term: string) {
		const params = {
			term,
			locale: 'cz'
		};

		this.setState({ isPending: true });

		try {
			const response = await axios.get('https://api.skypicker.com/places', { params });

			this.setState({
				items: response.data
					.slice(0, 10)
					.map((item) => pick(item, 'id', 'value')),
				isPending: false,
			});
		}
		catch (error) {
			console.warn(error);

			this.setState({ isPending: false });
		}
	}

	_handleInputChange = (event: any) => {
		const { value } = event.target;

		// pokud uzivatel nezada alespon 2 znaky, tak nic neresime
		if (value.length > 1) {
			this.setState({ isPopoverBlocked: false });

			// TODO: debounce
			this._loadSuggestions(value);
		}
		else {
			this.setState({ isPopoverBlocked: true });
		}
	}

	render () {
		const inputProps = {
			onChange: this._handleInputChange,
			placeholder: 'Jaké místo?'
		};

		const popoverProps = {};

		if (this.state.isPopoverBlocked) {
			popoverProps.isOpen = false;
		}

		return (
			<Suggest
				closeOnSelection={true}
				items={this.state.items}
				itemRenderer={this._itemRenderer}
				minimal={true}
        		openOnKeyDown={false}
				inputProps={inputProps}
				popoverProps={popoverProps}
				inputValueRenderer={this._inputValueRenderer}
				onItemSelect={this._handleItemClick}
				noResults={<MenuItem disabled={true} text="Zadání bohužel neodpovídá žádný návrh" />}
			/>
		);
	}
}
