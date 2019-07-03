import { FETCH, FETCH_FAILED, FETCH_SUCCEEDED } from './actionTypes/AsyncActionTypes';


export const fetchBubbles = query => {
	return dispatch => {

		dispatch(_fetch(query))

		return fetch(`/manifesto-bubbles/${query}`)
			.then(response => response.json(), error => dispatch(_fetchFailed(error)))
			.then(data => dispatch(_fetchSucceeded(data)));
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

const _fetchSucceeded = data => ({
	type: FETCH_SUCCEEDED,
	receivedAt: Date.now(),
	data
});
