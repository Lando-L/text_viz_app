import React, { Component } from 'react';

import PartySearchContainer from '../containers/PartySearchContainer';
import withSearchResults from './withSearchResults';
import SimpleLineChart from './Charts/SimpleLineChart';
import PieChart from './Charts/PieChart';


class SearchPartyResults extends Component {
	constructor(props) {
		super(props);

		this.handleOptionChange = this.handleOptionChange.bind(this);

		this.state = { option: 0 };

	}

	handleOptionChange(event) {
		this.setState({ option: event.target.value });
	}

	render() {
		return (
			<div className="party-search col">
				<div className="row spacer spacer-3"></div>
				<div className="row w-100">
					<div className="col">
						<h1>Results for: "{ this.props.match.params.q }"</h1>
					</div>
				</div>
				<div className="row spacer"></div>
				<div className="row w-100">
					<div className="results col">
						<h6>Election Results over time</h6>

						<div className="shadow-sm rounded">
							<form>
								<div className="form-group m-0">
										{ this.props.status === 'succeeded'
											? <select className="custom-select" onChange={this.handleOptionChange}>
												{ this.props.results.options.map((option, idx) => (
													<option
														key={`option-${option.slug}`}
														value={idx}>
														{ option.label }
													</option>
												))}
											</select>

											: <p>Loading...</p>
										}
								</div>
							</form>
						</div>

						{ this.props.status === 'succeeded'
							? <SimpleLineChart
								width={600}
								height={400}
								data={SearchPartyResults.selectOption(this.props.results.options[this.state.option].slug)(this.props.results.scores)}
								domainX={[0, this.props.results.scores.length - 1]}
								domainY={this.props.results.options[this.state.option].range}/>
							: null
						}
					</div>
					<div className="topics col">
						<h6>Most Relevant topics</h6>
						<PieChart/>
					</div>
				</div>
				<div className="row spacer"></div>
			</div>
		);
	}
}

SearchPartyResults.selectOption = slug => scores => scores.map(s => ({ x: s.year, y: +s.score[slug] }));

export default PartySearchContainer(withSearchResults(SearchPartyResults, 1));
