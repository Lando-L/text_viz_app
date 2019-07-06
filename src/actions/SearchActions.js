import $ from 'jquery';

import { 
	SELECT_DOMAIN,
	FETCH_QUERY,
	FETCH_QUERY_FAILED,
	FETCH_QUERY_SUCCEEDED
} from './actionTypes/SearchActionTypes';


export const selectDomain = domain => ({
	type: SELECT_DOMAIN,
	domain
});

export const fetchQuery = (query, domain) => {
	return dispatch => {

		dispatch(_fetch(query))

		return fetch(`/word/search?${$.param({ q: query, d: domain.parameter })}`)
			.then(response => response.json(), error => dispatch(_fetchFailed(error)))
			.then(results => dispatch(_fetchSucceeded(results)));
	}
};

const _fetch = (query) => ({
	type: FETCH_QUERY,
	query
});

const _fetchFailed = error => ({
	type: FETCH_QUERY_FAILED,
	receivedAt: Date.now(),
	error
});

const _fetchSucceeded = results => ({
	type: FETCH_QUERY_SUCCEEDED,
	receivedAt: Date.now(),
	results
});
