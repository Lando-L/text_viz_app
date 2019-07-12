import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchContainer from '../containers/SearchContainer';
import withSearchResults from './withSearchResults';
import SimpleLineChart from './Charts/SimpleLineChart'
import PieChart from './Charts/PieChart';
import Slider from './Slider';


class SearchWordResults extends Component {
	constructor(props) {
		super(props);

		this.handleYearChange = this.handleYearChange.bind(this);

		this.state = { year: 0 };

	}

	handleYearChange(year) {
		this.setState({ year });
	}

	render() {
		return (
			<div className="word-search col d-flex flex-column justify-content-center align-items-center">
				<div className="row spacer"></div>
				<div className="row">
					<h1>Results for: "{ this.props.match.params.q }"</h1>
				</div>
				<div className="row spacer"></div>
				<div className="row w-100">
					<div className="relevance col">
						<h6>Relevance over time</h6>
						<SimpleLineChart
							width={600}
							height={400}
							data={this.props.relevance}
							domainX={[0, this.props.relevance.length]}
							domainY={[0, 100]}/>
					</div>
					<div className="usages col">
						<h6>Usages</h6>
						<div className="d-flex flex-columns overflow-hidden">
							<div>
								<PieChart
									width={300}
									height={300}
									data={this.props.usages[this.state.year].score}/>

								<h5 className="text-center">{this.props.years[this.state.year]}</h5>
							</div>

							<div className="d-flex justify-content-center align-items-center">
								<Slider
									min={0}
									max={this.props.years.length - 1}
									update={this.handleYearChange}
									value={this.state.year}/>
							</div>
						</div>
					</div>
				</div>
				<div className="row spacer"></div>
				<div className="row w-100">
					<div className="neighbors col">
						<h6>Similar terms</h6>
						<ul>
							{this.props.neighbors.map((word, idx) => (
								<li key={`similar-word-${idx}`} className="d-inline pl-3 pr-3">
									<Link to={`/search/word/${word}`}>{ word }</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="row spacer"></div>
			</div>
		);
	}
}

SearchWordResults.defaultProps = {
	years: ["1949", "1953", "1957", "1961", "1965", "1969", "1973", "1977", "1981", "1985", "1989", "1993", "1997", "2001", "2005", "2009", "2013", "2017"],
	relevance: [{"x": "1949", "y": 1}, {"x": "1953", "y": 0}, {"x": "1957", "y": 0}, {"x": "1961", "y": 1}, {"x": "1965", "y": 2}, {"x": "1969", "y": 0}, {"x": "1972", "y": 2}, {"x": "1976", "y": 2}, {"x": "1980", "y": 2}, {"x": "1983", "y": 2}, {"x": "1987", "y": 6}, {"x": "1990", "y": 6}, {"x": "1994", "y": 12}, {"x": "1998", "y": 15}, {"x": "2002", "y": 8}, {"x": "2005", "y": 9}, {"x": "2009", "y": 59}, {"x": "2013", "y": 34}, {"x": "2017", "y": 52}],
	usages: [{"year": "1949", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0069451072656282935}, {"party": "fdp", "value": 0.0}, {"party": "gruene", "value": 0.0}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.0}]}, {"year": "1953", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0}, {"party": "fdp", "value": 0.0}, {"party": "gruene", "value": 0.0}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.0}]}, {"year": "1957", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0}, {"party": "fdp", "value": 0.0}, {"party": "gruene", "value": 0.0}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.0}]}, {"year": "1961", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0}, {"party": "fdp", "value": 0.015252878020999333}, {"party": "gruene", "value": 0.0}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.0}]}, {"year": "1965", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0}, {"party": "fdp", "value": 0.0}, {"party": "gruene", "value": 0.0}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.004924505558191384}]}, {"year": "1969", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0}, {"party": "fdp", "value": 0.0}, {"party": "gruene", "value": 0.0}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.0}]}, {"year": "1972", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0}, {"party": "fdp", "value": 0.0}, {"party": "gruene", "value": 0.0}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.009315642500666054}]}, {"year": "1976", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.007564227514411144}, {"party": "fdp", "value": 0.006839046722235072}, {"party": "gruene", "value": 0.0}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.0}]}, {"year": "1980", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0}, {"party": "fdp", "value": 0.0030825534819685354}, {"party": "gruene", "value": 0.0}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.00592850738117555}]}, {"year": "1983", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0}, {"party": "fdp", "value": 0.007252869876988884}, {"party": "gruene", "value": 0.0}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.005580955124499235}]}, {"year": "1987", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0}, {"party": "fdp", "value": 0.01763098448293852}, {"party": "gruene", "value": 0.0029113839712393095}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.01808070653758682}]}, {"year": "1990", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.0}, {"party": "fdp", "value": 0.005176755097356993}, {"party": "gruene", "value": 0.011516215230201273}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.0}]}, {"year": "1994", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.007463841401421751}, {"party": "fdp", "value": 0.0017643615321727374}, {"party": "gruene", "value": 0.012862597427110774}, {"party": "linke", "value": 0.0064021638635390725}, {"party": "spd", "value": 0.009099520006226028}]}, {"year": "1998", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.012786232374628568}, {"party": "fdp", "value": 0.011841656178846237}, {"party": "gruene", "value": 0.010739603667364688}, {"party": "linke", "value": 0.006163482877204633}, {"party": "spd", "value": 0.0}]}, {"year": "2002", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.007026000736956767}, {"party": "fdp", "value": 0.0020586249571636172}, {"party": "gruene", "value": 0.00915619759104393}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.006901052263959589}]}, {"year": "2005", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.010305206286265911}, {"party": "fdp", "value": 0.003140356378097037}, {"party": "gruene", "value": 0.013401957480995985}, {"party": "linke", "value": 0.005871041455762967}, {"party": "spd", "value": 0.0}]}, {"year": "2009", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.01781590590100193}, {"party": "fdp", "value": 0.011464365434206708}, {"party": "gruene", "value": 0.06207406912266468}, {"party": "linke", "value": 0.009244273219829052}, {"party": "spd", "value": 0.01358137414244491}]}, {"year": "2013", "score": [{"party": "afd", "value": 0.0}, {"party": "union", "value": 0.006361547308941465}, {"party": "fdp", "value": 0.009558797284307908}, {"party": "gruene", "value": 0.02562524677388645}, {"party": "linke", "value": 0.0}, {"party": "spd", "value": 0.0}]}, {"year": "2017", "score": [{"party": "afd", "value": 0.007935819266635644}, {"party": "union", "value": 0.01709761345866139}, {"party": "fdp", "value": 0.006574662704513841}, {"party": "gruene", "value": 0.027704706507780615}, {"party": "linke", "value": 0.017477538527353124}, {"party": "spd", "value": 0.00634028918120249}]}],
	neighbors: ['zerstören', 'natur', 'artenvielfalt']
};

export default SearchContainer(withSearchResults(SearchWordResults, 0));
