import { Map } from 'immutable';

import { UPDATE_ELECTION_RESULTS, RESET_ELECTION_RESULTS } from '../actions/actionTypes/ElectionResultsActionTypes';

const INIT_STATE = Map({
	'Union': 32.9,
	'SPD': 20.5,
	'AfD': 12.6,
	'FDP': 10.7,
	'Linke': 9.2,
	'Gruene': 8.9,
	'Sonst.': 5.2
});

const ElectionResultsReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case UPDATE_ELECTION_RESULTS:
			
			const priorRemainder = 100 - state.get(action.name);
			const postRemainder = 100 - action.percentage;

			return state.map((percentage, name) => {
				if (name === action.name) {
					return action.percentage;
				} else {
					if (priorRemainder === 0) {
						return postRemainder / (state.size - 1)
					} else {
						return  percentage / priorRemainder * postRemainder;
					}
				}
			});

		case RESET_ELECTION_RESULTS:
			return INIT_STATE;

		default:
			return state;
	}
};

export default ElectionResultsReducer;
