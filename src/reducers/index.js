import { combineReducers } from 'redux';

import BubblesReducer from './BubblesReducer';
import PartiesReducer from './PartiesReducer';
import PartySearchReducer from './PartySearchReducer';
import WordSearchReducer from './WordSearchReducer';


export default combineReducers({
	bubbles: BubblesReducer,
	parties: PartiesReducer,
	party: PartySearchReducer,
	word: WordSearchReducer
});
