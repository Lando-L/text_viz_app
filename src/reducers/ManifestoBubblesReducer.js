import { Map } from 'immutable';

import { FETCH, FETCH_FAILED, FETCH_SUCCEEDED } from '../actions/actionTypes/AsyncActionTypes';


const INIT_STATE = Map({ status: 'init' });

export default (state = INIT_STATE, action) => {
	switch(action.type) {
		case FETCH:
			return state
				.set('status', 'fetching')
				.delete('data')
				.delete('error')
				.delete('receivedAt');
		
		case FETCH_FAILED:
			return state
				.set('status', 'failed')
				.delete('data')
				.set('error', action.error)
				.set('receivedAt', action.receivedAt);
		
		case FETCH_SUCCEEDED:
			return state
				.set('status', 'succeeded')
				.set('data', action.data)
				.delete('error')
				.set('receivedAt', action.receivedAt);

		default:
			return state;
	}
};
