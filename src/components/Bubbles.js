import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import colorCodes from '../utils/colorCodes';
import BubblesContainer from '../containers/BubblesContainer';
import BubbleChart from './Charts/BubbleChart';
import Slider from './Slider';


class Bubbles extends Component {
	constructor(props) {
		super(props);

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.handleOptionChange = this.handleOptionChange.bind(this);
	}

	handleOptionChange(event) {
		this.props.selectOption(event.target.value);
	}	

	componentDidMount() {
		this.props.fetchBubbles();
	}

	render() {
		return (
			<div className="row h-100">
				<div className="floating-container float-top float-left">
					<div className="shadow-sm rounded">
						<form>
							<div className="form-group m-0">
									{ this.props.status === 'succeeded'
										? <select className="custom-select" onChange={this.handleOptionChange}>
											{ this.props.data.options.map((option, idx) => (
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
							{ this.props.status === 'succeeded'
								? this.props.data.parties.map((party, idx) => (
									<li
										key={`legend-${party.slug}`}
										className="list-group-item"
										style={{ color: colorCodes.get(party.slug) }}>
										
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

				<div className="shadow-sm rounded floating-container float-bottom float-center">
					<form>
							{ this.props.status === 'succeeded'
								? <div className="form-group p-3 m-0">
									<h5 className="text-center">{this.props.data.years[this.props.year]}</h5>
									<Slider
										min="0"
										max={this.props.data.years.length - 1}
										update={this.props.selectYear}
										value={this.props.year}
										disabled={this.props.data.years.length === 1}/>

								</div>

								: <p>Loading...</p>
							}
					</form>
				</div>

				<div className="col d-flex flex-column justify-content-center align-items-center">
					{ this.props.status === 'succeeded'
						? <BubbleChart
							option={this.props.option}
							year={this.props.data.years[this.props.year]}
							bubbles={this.props.data.bubbles}
							width={window.innerWidth}
							height={window.innerHeight}
							highlight={this.props.highlight}
							toggleHighlighting={this.props.toggleHighlighting}/>

						: <p>Loading...</p> }
				</div>
			</div>
		);
	}
}

export default BubblesContainer(Bubbles);
