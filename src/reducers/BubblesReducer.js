import { Map } from 'immutable';

import {
	SELECT_OPTION,
	SELECT_YEAR,
	FETCH_BUBBLES,
	FETCH_BUBBLES_FAILED,
	FETCH_BUBBLES_SUCCEEDED
} from '../actions/actionTypes/BubblesActionTypes';


const INIT_STATE = Map({ status: 'init' });

export default (state = INIT_STATE, action) => {
	switch(action.type) {
		case SELECT_OPTION:
			return state
				.set('option', action.option);

		case SELECT_YEAR:
			return state
				.set('year', action.year);			

		case FETCH_BUBBLES:
			return state
				.set('status', 'fetching')
				.delete('data')
				.delete('error')
				.delete('receivedAt')
				.delete('option')
				.delete('year');
		
		case FETCH_BUBBLES_FAILED:
			return state
				.set('status', 'failed')
				.delete('data')
				.set('error', action.error)
				.set('receivedAt', action.receivedAt);
		
		case FETCH_BUBBLES_SUCCEEDED:
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
