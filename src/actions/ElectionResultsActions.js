import { FETCH, FETCH_FAILED, FETCH_SUCCEEDED } from './actionTypes/AsyncActionTypes';
import { UPDATE_ELECTION_RESULTS, RESET_ELECTION_RESULTS } from './actionTypes/ElectionResultsActionTypes';

export const fetchElectionResults = year => {
	return dispatch => {
		dispatch(_requestElectionResults())

		return fetch('/electionResults')
			.then(
				response => response.json(),
				error => console.log('Fetching error', error)
			).then(json => {
				console.log(json);
				return dispatch(_receiveElectionResultsSuccess(json));
			});
	}
};

export const update = (name, percentage) => ({
	type: UPDATE_ELECTION_RESULTS,
	name,
	percentage
});

export const reset = () => ({
	type: RESET_ELECTION_RESULTS
});

const _requestElectionResults = year => ({
	type: FETCH
});

const _receiveElectionResultsFailed = (electionResults, json) => ({
	type: FETCH_FAILED,
	json
});

const _receiveElectionResultsSuccess = (electionResults, json) => ({
	type: FETCH_SUCCEEDED,
	json
});
