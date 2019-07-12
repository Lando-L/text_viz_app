import React, { Component, createRef } from 'react';
import * as d3 from 'd3';


class OpposingBarsChart extends Component {

	margin = { top: 50, right: 50, bottom: 50, left: 50 };
	labelGap = 50;
	gap = 5;

	constructor(props) {
		super(props);

		this.barWidth = OpposingBarsChart.adjustHeight(margin)(props.height) / props.data.length

		this.xScale = d3
			.scaleLinear()
			.domain([0, d3.max(props.data)])
			.range([0, OpposingBarsChart.adjustWidth(margin)(props.width) / 2 - this.labelGap]);
		
		this.yScale = d3
			.scaleLinear()
			.domain([0, props.data.length])
			.range([OpposingBarsChart.adjustHeight(margin)(props.height), 0]);
	}

	render() {
		return (
			<svg width={this.props.width} height={this.props.height}>
				
			</svg>
		);
	}
}

OpposingBarsChart.defaultProps = {
	width: 800,
	height: 600,
	data: []
}

OpposingBarsChart.adjustWidth = margin => width => width - margin.left - margin.right;

OpposingBarsChart.adjustHeight = margin => height => height - margin.top - margin.bottom;
export default OpposingBarsChart;
