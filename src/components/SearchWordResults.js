import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import WordSearchContainer from '../containers/WordSearchContainer';
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

		console.log(this.props);

		return (
			<div className="word-search col">
				<div className="row spacer spacer-3"></div>
				<div className="row w-100">
					<div className="col">
						<h1>Results for: "{ this.props.match.params.q }"</h1>
					</div>
				</div>
				<div className="row spacer"></div>
				<div className="row w-100">
					<div className="relevance col">
						<h6>Relevance over time</h6>
						{ this.props.status === 'succeeded'
							? <SimpleLineChart
								width={600}
								height={400}
								data={this.props.results.relevance}
								domainX={[0, this.props.results.relevance.length]}
								domainY={[0, 100]}/>
							: <p>Loading...</p>
						}
					</div>
					<div className="usages col">
						<h6>Usages</h6>

						{ this.props.status === 'succeeded'
							? <div className="d-flex flex-columns overflow-hidden">
								<div>
									<PieChart
										width={300}
										height={300}
										data={this.props.results.usages[this.state.year].score}/>

									<h5 className="text-center">{this.props.results.years[this.state.year]}</h5>
								</div>

								<div className="d-flex justify-content-center align-items-center">
									<Slider
										min={0}
										max={this.props.results.years.length - 1}
										update={this.handleYearChange}
										value={this.state.year}/>
								</div>
							</div>
							: <p>Loading...</p>
						}
					</div>
				</div>
				<div className="row spacer"></div>
				<div className="row w-100">
					<div className="neighbors col">
						<h6>Similar terms</h6>

						{ this.props.status === 'succeeded'
							? <ul>
								{this.props.results.neighbors.map((word, idx) => (
									<li key={`similar-word-${idx}`} className="d-inline pl-3 pr-3">
										<Link to={`/search/words/${word}`}>{ word }</Link>
									</li>
								))}
							</ul>
							: <p>Loading...</p>
						}
					</div>
				</div>
			</div>
		);
	}
}

export default WordSearchContainer(withSearchResults(SearchWordResults, 0));
