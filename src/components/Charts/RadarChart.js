import React, { Component, createRef } from 'react';
import * as d3 from 'd3';


class RadarChart extends Component {
	constructor(props) {
		super(props);
		this.group = createRef();
	}

	render() {
		return (
			<svg width={this.props.width} height={this.props.height}>
				<g ref={this.group} className="focus"></g>
			</svg>
		);
	}
}

export default RadarChart;
