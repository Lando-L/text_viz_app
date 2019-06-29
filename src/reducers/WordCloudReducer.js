import { fromJS, List } from 'immutable';

import { FETCH_NEW_FREQUENCIES, FETCH_FAILED, FETCH_SUCCEEDED } from '../actions/actionTypes/WordCloudActionTypes';


const INIT_STATE = fromJS({
	status: 'success',
	words: [
		{ name: 'Union', word: 'D3', frequency: 1 },
		{ name: 'SPD', word: 'word', frequency: 1 },
		{ name: 'AfD', word: 'clouds', frequency: 1 },
		{ name: 'FDP', word: 'are', frequency: 1 },
		{ name: 'Linke', word: 'not', frequency: 1 },
		{ name: 'Gruene', word: 'super', frequency: 1 },
		{ name: 'Sonst.', word: 'intuitive', frequency: 1 }
	]
});

const WordCloudReducer = (state = INIT_STATE, action) => {
	switch (action.type) {
		case FETCH_NEW_FREQUENCIES:
			return state.set('status', 'fetching').set('items', List());

		case FETCH_FAILED:
			return state.set('status', 'fail').set('items', List());

		case FETCH_SUCCEEDED:
			return state.set('status', 'success').set('items', fromJS(action.words))

		default:
			return state;
	}
}

export default WordCloudReducer;
