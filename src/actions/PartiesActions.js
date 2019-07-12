import {
	PARTIES_SELECT_OPTION,
	PARTIES_TOGGLE_HIGHLIGHTING,
	PARTIES_FETCH,
	PARTIES_FETCH_FAILED,
	PARTIES_FETCH_SUCCEEDED
} from './actionTypes/PartiesActionTypes';


export const selectOption = option => ({
	type: PARTIES_SELECT_OPTION,
	option
});

export const toggleHighlighting = party => ({
	type: PARTIES_TOGGLE_HIGHLIGHTING,
	party
});

export const fetchParties = () => {
	return dispatch => {

		dispatch(_fetch())

		return fetch('/parties')
			.then(response => response.json(), error => dispatch(_fetchFailed(error)))
			.then(data => dispatch(_fetchSucceeded(data)));
	}
};

const _fetch = () => ({
	type: PARTIES_FETCH
});

const _fetchFailed = error => ({
	type: PARTIES_FETCH_FAILED,
	receivedAt: Date.now(),
	error
});

const _fetchSucceeded = data => ({
	type: PARTIES_FETCH_SUCCEEDED,
	receivedAt: Date.now(),
	data
});
