// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Main from './Main';

ReactDOM.render(
	// <AppContainer>
		<Main />,
	// </AppContainer>,
	(document.getElementById('root') : any)
);
