import { combineReducers } from 'redux';

import ElectionResultsReducer from './ElectionResultsReducer';
import WordCloudReducer from './WordCloudReducer';

export default combineReducers({ electionResults: ElectionResultsReducer, wordCloud: WordCloudReducer });
