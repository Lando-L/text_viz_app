import { UPDATE_ELECTION_RESULTS, RESET_ELECTION_RESULTS } from './actionTypes/ElectionResultsActionTypes';


export const update = (name, percentage) => ({
	type: UPDATE_ELECTION_RESULTS,
	name,
	percentage
});

export const reset = () => ({
	type: RESET_ELECTION_RESULTS
});
