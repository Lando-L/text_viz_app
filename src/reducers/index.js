import { combineReducers } from 'redux';

import ManifestoBubblesReducer from './ManifestoBubblesReducer';
import WordSearchReducer from './WordSearchReducer';


export default combineReducers({ wordSearch: WordSearchReducer, manifestoBubbles: ManifestoBubblesReducer });
