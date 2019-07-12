import $ from 'jquery';

import { 
	PARTY_FETCH,
	PARTY_FETCH_FAILED,
	PARTY_FETCH_SUCCEEDED
} from './actionTypes/PartySearchActionTypes';


export const fetchQuery = query => {
	return dispatch => {

		dispatch(_fetch(query))

		return fetch(`/parties/search?${$.param({ q: query })}`)
			.then(response => response.json(), error => dispatch(_fetchFailed(error)))
			.then(results => dispatch(_fetchSucceeded(results)));
	}
};

const _fetch = (query) => ({
	type: PARTY_FETCH,
	query
});

const _fetchFailed = error => ({
	type: PARTY_FETCH_FAILED,
	receivedAt: Date.now(),
	error
});

const _fetchSucceeded = results => ({
	type: PARTY_FETCH_SUCCEEDED,
	receivedAt: Date.now(),
	results
});
