import React, { Component } from 'react';

import SearchContainer from '../containers/SearchContainer';
import withSearchResults from './withSearchResults';
import SimpleLineChart from './Charts/SimpleLineChart';
import PieChart from './Charts/PieChart';


class SearchPartyResults extends Component {
	render() {
		return (
			<div className="col d-flex flex-column justify-content-center align-items-center">
				<div className="row spacer"></div>
				<div className="row">
					<h1>Results for: "{ this.props.match.params.q }"</h1>
				</div>
				<div className="row spacer"></div>
				<div className="row">
					<div className="col">
						<h6>Election Results over time</h6>
						<SimpleLineChart/>
					</div>
					<div className="col">
						<h6>Most Relevant topics</h6>
						<PieChart/>
					</div>
				</div>
				<div className="row spacer"></div>
				<div className="row">
					<div className="col">
						<h6>Readability over time</h6>
						<SimpleLineChart/>
					</div>
				</div>
				<div className="row spacer"></div>
			</div>
		);
	}
}

export default SearchContainer(withSearchResults(SearchPartyResults, 1));
