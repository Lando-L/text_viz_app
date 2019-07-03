import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import colorCodes from '../utils/colorCodes';
import ManifestoBubblesContainer from '../containers/ManifestoBubblesContainer';
import BubbleChart from './Charts/BubbleChart';


class Bubbles extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.fetchBubbles(event.target.value);
	}

	componentDidMount() {
		this.props.fetchBubbles('');
	}

	render() {
		return (
			<div className="row h-100">
				<div className="floating-container float-left">
					<div className="shadow-sm rounded">
						<form>
							<div className="form-group m-0">
								<select className="custom-select" onChange={this.handleChange}>
									<option value="umap">UMAP</option>
									<option value="tsne">t-SNE</option>
									<option value="pca">PCA</option>
								</select>
							</div>
						</form>
					</div>

					<div className="spacer"></div>

					<div className="shadow-sm rounded legend">
						<ul className="list-group">
							{ this.props.data ? this.props.data.parties.map((party, idx) => (
								<li key={`legend-${party.key}`} className="list-group-item" style={{ color: colorCodes.get(party.key) }}>
									<div className="d-flex flex-row align-items-center">
										<div className="circle mr-3" style={{ background: colorCodes.get(party.key) }}></div>
										{ party.name }
									</div>
								</li>
							)) : <p>...Loading</p>}
						</ul>
					</div>
				</div>

				<div className="floating-container float-right">
					<Link to="/">Home</Link>
				</div>

				<div className="col d-flex flex-column justify-content-center align-items-center">
					{ this.props.data
						? <BubbleChart bubbles={this.props.data.bubbles} width="1000" height="600"/>
						: <p>...Loading</p> }
				</div>
			</div>
		);
	}
}

export default ManifestoBubblesContainer(Bubbles);
