import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import colorCodes from '../utils/colorCodes';
import PartiesContainer from '../containers/PartiesContainer';
import TimeLineChart from './Charts/TimeLineChart';


class PartyOverview extends Component {

	width = 800;
	height = 600;

	constructor(props) {
		super(props);
		this.handleOptionChange = this.handleOptionChange.bind(this);
	}

	handleOptionChange(event) {
		event.preventDefault();
		this.props.selectOption(event.target.value)
	}

	handlePartiesChange(party) {
		return event => {
			event.preventDefault();
			this.props.toggleHighlighting(party)
		}
	}

	componentDidMount() {
		this.props.fetchParties();
	}

	render() {

		return (
			<div className="row">
				<div className="floating-container float-top float-left">
					<div className="shadow-sm rounded">
						<form>
							<div className="form-group m-0">
									{ this.props.options
										? <select className="custom-select" onChange={this.handleOptionChange}>
											{ this.props.options.map((option, idx) => (
												<option
													key={`option-${option.slug}`}
													value={option.slug}>
													{ option.label }
												</option>
											))}
										</select>

										: <p>Loading...</p>
									}
							</div>
						</form>
					</div>

					<div className="spacer"></div>

					<div className="shadow-sm rounded legend">
						<ul className="list-group">
							{ this.props.parties
								? this.props.parties.map((party, idx) => (
									<li
										key={`legend-${party.slug}`}
										className="list-group-item"
										style={{
											color: colorCodes.get(party.slug),
											opacity: this.props.highlight.has(party.slug) ? 1 : 0.1
										}}
										onClick={this.handlePartiesChange(party.slug)}>
										
										<div className="d-flex flex-row align-items-center">
											<div
												className="circle mr-3"
												style={{ background: colorCodes.get(party.slug) }}
											></div>
											{ party.label }
										</div>

									</li>
								))

								: <p>Loading...</p>
							}
						</ul>
					</div>
				</div>

				<div className="floating-container float-top float-right">
					<Link to="/">Home</Link>
				</div>

				<div className="col d-flex justify-content-center">
					{ this.props.status === 'succeeded'
						? <TimeLineChart
							width={this.width}
							height={this.height}
							data={PartyOverview.selectOption(this.props.option)(this.props.data)}
							domainX={[0, this.props.years.length]}
							domainY={PartyOverview.selectDomain(this.props.option, [0, 1])(this.props.options)}
							highlight={this.props.highlight}/>
						: <p>Loading...</p>
					}
				</div>
			</div>
		);
	}
}

PartyOverview.selectOption = slug => data => {
	return data.map(d => ({
		party: d.party,
		scores: d.scores.map(s => ({ x: s.year, y: +s.score[slug] }))
	}));
}

PartyOverview.selectDomain = (slug, ifNone) => options => {
	const domain = options.find(opt => opt.slug === slug);
	return domain ? domain.range : ifNone;
}

export default PartiesContainer(PartyOverview);
