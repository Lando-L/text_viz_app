import {
	BUBBLES_SELECT_OPTION,
	BUBBLES_SELECT_YEAR,
	BUBBLES_TOGGLE_HIGHLIGHTING,
	BUBBLES_FETCH,
	BUBBLES_FETCH_FAILED,
	BUBBLES_FETCH_SUCCEEDED
} from './actionTypes/BubblesActionTypes';


export const selectOption = option => ({
	type: BUBBLES_SELECT_OPTION,
	option
});

export const selectYear = year => ({
	type: BUBBLES_SELECT_YEAR,
	year
});

export const toggleHighlighting = party => ({
	type: BUBBLES_TOGGLE_HIGHLIGHTING,
	party
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
	type: BUBBLES_FETCH
});

const _fetchFailed = error => ({
	type: BUBBLES_FETCH_FAILED,
	receivedAt: Date.now(),
	error
});

const _fetchSucceeded = data => ({
	type: BUBBLES_FETCH_SUCCEEDED,
	receivedAt: Date.now(),
	data
});
