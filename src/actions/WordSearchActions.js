import $ from 'jquery';

import { FETCH, FETCH_FAILED, FETCH_SUCCEEDED } from './actionTypes/AsyncActionTypes';


export const fetchQuery = query => {
	return dispatch => {

		dispatch(_fetch(query))

		return fetch(`/word/search?${$.param({ q: query })}`)
			.then(response => response.json(), error => dispatch(_fetchFailed(error)))
			.then(results => dispatch(_fetchSucceeded(results)));
	}
};

const _fetch = query => ({
	type: FETCH,
	query
});

const _fetchFailed = error => ({
	type: FETCH_FAILED,
	receivedAt: Date.now(),
	error
});

const _fetchSucceeded = results => ({
	type: FETCH_SUCCEEDED,
	receivedAt: Date.now(),
	results
});
