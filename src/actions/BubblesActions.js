import {
	SELECT_OPTION,
	SELECT_YEAR,
	FETCH_BUBBLES,
	FETCH_BUBBLES_FAILED,
	FETCH_BUBBLES_SUCCEEDED
} from './actionTypes/BubblesActionTypes';


export const selectOption = option => ({
	type: SELECT_OPTION,
	option
});

export const selectYear = year => ({
	type: SELECT_YEAR,
	year
});

export const fetchBubbles = () => {
	return dispatch => {

		dispatch(_fetch())

		return fetch('/bubbles')
			.then(response => response.json(), error => dispatch(_fetchFailed(error)))
			.then(data => dispatch(_fetchSucceeded(data)));
	}
};

const _fetch = () => ({
	type: FETCH_BUBBLES
});

const _fetchFailed = error => ({
	type: FETCH_BUBBLES_FAILED,
	receivedAt: Date.now(),
	error
});

const _fetchSucceeded = data => ({
	type: FETCH_BUBBLES_SUCCEEDED,
	receivedAt: Date.now(),
	data
});
