import { combineReducers } from 'redux';

import BubblesReducer from './BubblesReducer';
import SearchReducer from './SearchReducer';


export default combineReducers({ bubbles: BubblesReducer, search: SearchReducer });
