import { Map } from 'immutable';

import {
	PARTIES_FETCH,
	PARTIES_FETCH_FAILED,
	PARTIES_FETCH_SUCCEEDED
} from '../actions/actionTypes/PartiesActionTypes';


const INIT_STATE = Map({ status: 'init' });

export default (state = INIT_STATE, action) => {
	switch(action.type) {
		case PARTIES_FETCH:
			return state
				.set('status', 'fetching')
				.delete('data')
				.delete('error')
				.delete('receivedAt')
				.delete('controls');
		
		case PARTIES_FETCH_FAILED:
			return state
				.set('status', 'failed')
				.delete('data')
				.set('error', action.error)
				.set('receivedAt', action.receivedAt)
				.delete('controls');
		
		case PARTIES_FETCH_SUCCEEDED:
			return state
				.set('status', 'succeeded')
				.set('data', action.data)
				.delete('error')
				.set('receivedAt', action.receivedAt);

		default:
			return state;
	}
};
