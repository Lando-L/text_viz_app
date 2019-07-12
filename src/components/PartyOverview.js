import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Set } from 'immutable';

import colorCodes from '../utils/colorCodes';
import PartiesContainer from '../containers/PartiesContainer';
import TimeLineChart from './Charts/TimeLineChart';


class PartyOverview extends Component {

	width = 800;
	height = 600;

	constructor(props) {
		super(props);
		this.handleOptionChange = this.handleOptionChange.bind(this);

		this.state = { option: 0, selected: Set() }
	}

	handleOptionChange(event) {
		event.preventDefault();
		this.setState({ option: event.target.value });
	}

	handlePartiesChange(idx) {
		return event => {
			event.preventDefault();

			if (this.state.selected.has(idx)) {
				this.setState({ selected: this.state.selected.delete(idx) });
			} else {
				this.setState({ selected: this.state.selected.add(idx) });
			}
		}
	}

	componentDidMount() {
		this.props.fetchParties();
	}

	componentDidUpdate(prevProps) {
		if (this.props.data !== prevProps.data)
			this.setState({ option: 0, selected: Set(this.props.data.parties.map(party => party.slug)) });
	}

	render() {
		return (
			<div className="row">
				<div className="floating-container float-top float-left">
					<div className="shadow-sm rounded">
						<form>
							<div className="form-group m-0">
									{ this.props.status === 'succeeded'
										? <select className="custom-select" onChange={this.handleOptionChange}>
											{ this.props.data.options.map((option, idx) => (
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

					<div className="spacer"></div>

					<div className="shadow-sm rounded legend">
						<ul className="list-group">
							{ this.props.status === 'succeeded'
								? this.props.data.parties.map((party, idx) => (
									<li
										key={`legend-${party.slug}`}
										className="list-group-item"
										style={{
											color: colorCodes.get(party.slug),
											opacity: this.state.selected.has(party.slug) ? 1 : 0.1
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
							data={PartyOverview.selectOption(this.props.data.options[this.state.option].slug)(this.props.data.data)}
							domainX={[0, this.props.data.years.length]}
							domainY={PartyOverview.selectDomain(this.props.data.options[this.state.option].slug, [0, 1])(this.props.data.options)}
							selected={this.state.selected}/>
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
