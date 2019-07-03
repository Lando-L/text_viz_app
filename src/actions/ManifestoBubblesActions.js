import { FETCH, FETCH_FAILED, FETCH_SUCCEEDED } from './actionTypes/AsyncActionTypes';


export const fetchBubbles = () => {
	return dispatch => {

		dispatch(_fetch())

		return fetch('/manifesto-bubbles')
			.then(response => response.json(), error => dispatch(_fetchFailed(error)))
			.then(data => dispatch(_fetchSucceeded(data)));
	}
};

const _fetch = () => ({
	type: FETCH
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
