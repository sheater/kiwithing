// @flow
import * as React from 'react';
import { Suggest } from '@blueprintjs/labs';
import { MenuItem } from "@blueprintjs/core";
import cx from 'classnames';
import pick from 'lodash/pick';
import axios from 'axios';
import debounce from 'debounce-decorator';

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
		isPending: true,
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

	_triggerChange (id: string) {
		const { onChange } = this.props;

		if (onChange) {
			onChange(id);
		}
	}

	_handleItemClick = (item: ILocation) => {
		this._triggerChange(item.id);
	}

	_inputValueRenderer (item: ILocation) {
		return item.value;
	}

	_requestSource = null;

	@debounce(300)
	async _loadSuggestions (term: string) {
		const params = {
			term,
			locale: 'cz'
		};

		this.setState({ isPending: true, items: [] });

		if (this._requestSource) {
			this._requestSource.cancel();
		}

		try {
			this._requestSource = axios.CancelToken.source();
			const response = await axios.get(
				'https://api.skypicker.com/places',
				{
					params,
					cancelToken: this._requestSource.token
				}
			);

			this.setState({
				items: response.data
					.slice(0, 10)
					.map((item: Object) => pick(item, 'id', 'value')),
				isPending: false,
			});
		}
		catch (error) {
			console.warn(error);

			this.setState({ isPending: false });
		}
		finally {
			this._requestSource = null;
		}
	}

	_handleInputChange = (event: any) => {
		const { value } = event.target;

		// pokud uzivatel nezada alespon 2 znaky, tak nic neresime
		if (value.length > 1) {
			this.setState({ isPopoverBlocked: false });

			// flow tady rve: Function cannot be called on possibly null value
			this._loadSuggestions(value);
		}
		else {
			this.setState({ isPopoverBlocked: true });
			this._triggerChange('');
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
				noResults={
					<MenuItem
						disabled={true}
						text={
							this.state.isPending
								? 'Načítám...'
								: 'Zadání bohužel neodpovídá žádný návrh'
						}
					/>
				}
			/>
		);
	}
}
