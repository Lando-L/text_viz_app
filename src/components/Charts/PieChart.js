import React, { Component, createRef } from 'react';
import * as d3 from 'd3';

import colorCodes from '../../utils/colorCodes'


class PieChart extends Component {
	constructor(props) {
		super(props);

		this.group = createRef();

		this.radius = Math.min(props.width, props.height) / 2;
		this.arc = d3.arc().outerRadius(this.radius - 10).innerRadius(0);
		this.pie = d3.pie().sort(null).value(datum => datum.value);
	}

	draw() {
		d3
			.select(this.group.current)
			.selectAll('.arc')
			.data(this.pie(this.props.data))
			.join('path')
			.attr('class', 'arc')
			.attr('d', this.arc)
			.style('fill', datum => colorCodes.get(datum.data.party));
	}

	componentDidMount() {
		this.draw();
	}

	componentDidUpdate(prevProps) {
		if (this.props.data !== prevProps.data)
			this.draw();
	}

	render() {
		return (
			<svg width={this.props.width} height={this.props.height}>
				<g ref={this.group} transform={`translate(${this.props.width / 2},${this.props.height / 2})`}></g>
			</svg>
		);
	}
}

PieChart.defaultProps = {
	data: [
		{ party: 'union', value: 10 },
		{ party: 'spd', value: 10 },
		{ party: 'gruene', value: 10 },
		{ party: 'none', value: 5 }
	],
	width: 600,
	height: 400
}

export default PieChart;
