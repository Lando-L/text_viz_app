import { Map, Set } from 'immutable';

import {
	PARTIES_SELECT_OPTION,
	PARTIES_TOGGLE_HIGHLIGHTING,
	PARTIES_FETCH,
	PARTIES_FETCH_FAILED,
	PARTIES_FETCH_SUCCEEDED
} from '../actions/actionTypes/PartiesActionTypes';


const INIT_STATE = Map({ status: 'init' });

export default (state = INIT_STATE, action) => {
	switch(action.type) {
		case PARTIES_SELECT_OPTION:
			return state
				.set('option', action.option);

		case PARTIES_TOGGLE_HIGHLIGHTING:
			return state.update('highlight', highlight => {
				if (highlight.has(action.party))
					return highlight.delete(action.party);
				else
					return highlight.add(action.party);
			});

		case PARTIES_FETCH:
			return state
				.set('status', 'fetching')
				.delete('data')
				.delete('error')
				.delete('receivedAt')
				.delete('option');
		
		case PARTIES_FETCH_FAILED:
			return state
				.set('status', 'failed')
				.delete('data')
				.set('error', action.error)
				.set('receivedAt', action.receivedAt);
		
		case PARTIES_FETCH_SUCCEEDED:
			return state
				.set('status', 'succeeded')
				.set('data', action.data.data)
				.delete('error')
				.set('receivedAt', action.receivedAt)
				.set('parties', action.data.parties)
				.set('years', action.data.years)
				.set('options', action.data.options)
				.set('option', action.data.options[0].slug)
				.set('highlight', Set(action.data.parties.map(party => party.slug)));

		default:
			return state;
	}
};
