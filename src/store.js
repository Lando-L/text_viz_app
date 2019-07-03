import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import reducer from './reducers/index';


const loggerMiddleware = createLogger();

export default createStore(
	reducer,
	applyMiddleware(
		thunkMiddleware,
		loggerMiddleware
	)
);
