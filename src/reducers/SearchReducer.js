import { Map } from 'immutable';

import {
	SELECT_DOMAIN,
	FETCH_QUERY,
	FETCH_QUERY_FAILED,
	FETCH_QUERY_SUCCEEDED
} from '../actions/actionTypes/SearchActionTypes';


const INIT_STATE = Map({
	query: '',
	domain: 0,
	domains: [
		{ label: 'Word', parameter: 'word' },
		{ label: 'Party', parameter: 'party' },
	],
	status: 'init'
});

export default (state = INIT_STATE, action) => {
	switch(action.type) {
		case SELECT_DOMAIN:
			return state
				.set('domain', action.domain);


		case FETCH_QUERY:
			return state
				.set('query', action.query)
				.set('status', 'fetching')
				.delete('results')
				.delete('error')
				.delete('receivedAt');
		
		case FETCH_QUERY_FAILED:
			return state
				.set('status', 'failed')
				.delete('results')
				.set('error', action.error)
				.set('receivedAt', action.receivedAt);
		
		case FETCH_QUERY_SUCCEEDED:
			return state
				.set('status', 'succeeded')
				.set('results', action.results)
				.delete('error')
				.set('receivedAt', action.receivedAt);

		default:
			return state;
	}
};
