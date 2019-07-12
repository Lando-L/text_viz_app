import { Map } from 'immutable';

import {
	QUERY_FETCH,
	QUERY_FETCH_FAILED,
	QUERY_FETCH_SUCCEEDED
} from '../actions/actionTypes/SearchActionTypes';


const INIT_STATE = Map({ query: '', status: 'init' });

export default (state = INIT_STATE, action) => {
	switch(action.type) {
		case QUERY_FETCH:
			return state
				.set('query', action.query)
				.set('status', 'fetching')
				.delete('results')
				.delete('error')
				.delete('receivedAt');
		
		case QUERY_FETCH_FAILED:
			return state
				.set('status', 'failed')
				.delete('results')
				.set('error', action.error)
				.set('receivedAt', action.receivedAt);
		
		case QUERY_FETCH_SUCCEEDED:
			return state
				.set('status', 'succeeded')
				.set('results', action.results)
				.delete('error')
				.set('receivedAt', action.receivedAt);

		default:
			return state;
	}
};
