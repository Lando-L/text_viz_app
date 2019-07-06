import React from 'react';
import { Route } from 'react-router-dom';

import SearchForm from './SearchForm';
import SearchResults from './SearchResults';


const Search = ({ match }) => (
	<div className="w-100 h-100">
		<Route path={`${match.path}/:q`} component={SearchResults}/>
		<Route path={match.path} exact component={SearchForm}/>
	</div>
);

export default Search;
