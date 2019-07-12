import $ from 'jquery';

import { 
	WORD_FETCH,
	WORD_FETCH_FAILED,
	WORD_FETCH_SUCCEEDED
} from './actionTypes/WordSearchActionTypes';


export const fetchQuery = query => {
	return dispatch => {

		dispatch(_fetch(query))

		return fetch(`/words/search?${$.param({ q: query })}`)
			.then(response => response.json(), error => dispatch(_fetchFailed(error)))
			.then(results => dispatch(_fetchSucceeded(results)));
	}
};

const _fetch = (query) => ({
	type: WORD_FETCH,
	query
});

const _fetchFailed = error => ({
	type: WORD_FETCH_FAILED,
	receivedAt: Date.now(),
	error
});

const _fetchSucceeded = results => ({
	type: WORD_FETCH_SUCCEEDED,
	receivedAt: Date.now(),
	results
});
