import $ from 'jquery';

import { 
	QUERY_FETCH,
	QUERY_FETCH_FAILED,
	QUERY_FETCH_SUCCEEDED
} from './actionTypes/SearchActionTypes';


export const fetchQuery = (query, domain) => {
	return dispatch => {

		dispatch(_fetch(query))

		return fetch(`/word/search?${$.param({ q: query, d: domain })}`)
			.then(response => response.json(), error => dispatch(_fetchFailed(error)))
			.then(results => dispatch(_fetchSucceeded(results)));
	}
};

const _fetch = (query) => ({
	type: QUERY_FETCH,
	query
});

const _fetchFailed = error => ({
	type: QUERY_FETCH_FAILED,
	receivedAt: Date.now(),
	error
});

const _fetchSucceeded = results => ({
	type: QUERY_FETCH_SUCCEEDED,
	receivedAt: Date.now(),
	results
});
