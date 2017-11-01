import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import form from './form/reducer';
import result from './result/reducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export default function reduxStore () {
	const middleware = [ applyMiddleware(sagaMiddleware) ];

	if (window.__REDUX_DEVTOOLS_EXTENSION__) {
		middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
	}

	const store = createStore(
		combineReducers({ form, result }),
		compose(...middleware)
	);

	sagaMiddleware.run(rootSaga);

	return store;
}
