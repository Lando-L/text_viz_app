import React from 'react';
import { Route } from 'react-router-dom';

import WordSearchForm from './WordSearchForm';
import WordSearchResults from './WordSearchResults';


const WordSearch = ({ match }) => (
	<div className="w-100 h-100">
		<Route path={`${match.path}/:q`} component={WordSearchResults}/>
		<Route path={match.path} exact component={WordSearchForm}/>
	</div>
);

export default WordSearch;
