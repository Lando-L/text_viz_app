import { combineReducers } from 'redux';

import BubblesReducer from './BubblesReducer';
import PartiesReducer from './PartiesReducer';
import SearchReducer from './SearchReducer';


export default combineReducers({
	bubbles: BubblesReducer,
	parties: PartiesReducer,
	search: SearchReducer
});
