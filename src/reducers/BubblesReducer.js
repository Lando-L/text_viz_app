import { Map } from 'immutable';

import {
	BUBBLES_SELECT_OPTION,
	BUBBLES_SELECT_YEAR,
	BUBBLES_TOGGLE_HIGHLIGHTING,
	BUBBLES_FETCH,
	BUBBLES_FETCH_FAILED,
	BUBBLES_FETCH_SUCCEEDED
} from '../actions/actionTypes/BubblesActionTypes';


const INIT_STATE = Map({ status: 'init' });

export default (state = INIT_STATE, action) => {
	switch(action.type) {
		case BUBBLES_SELECT_OPTION:
			return state
				.set('option', action.option);

		case BUBBLES_SELECT_YEAR:
			return state
				.set('year', action.year);

		case BUBBLES_TOGGLE_HIGHLIGHTING:
			if (state.get('highlight'))
				return state.delete('highlight');
			else
				return state.set('highlight', action.party);

		case BUBBLES_FETCH:
			return state
				.set('status', 'fetching')
				.delete('data')
				.delete('error')
				.delete('receivedAt')
				.delete('option')
				.delete('year');
		
		case BUBBLES_FETCH_FAILED:
			return state
				.set('status', 'failed')
				.delete('data')
				.set('error', action.error)
				.set('receivedAt', action.receivedAt);
		
		case BUBBLES_FETCH_SUCCEEDED:
			return state
				.set('status', 'succeeded')
				.set('data', action.data)
				.delete('error')
				.set('receivedAt', action.receivedAt)
				.set('option', action.data.options[0].slug)
				.set('year', 0);

		default:
			return state;
	}
};
