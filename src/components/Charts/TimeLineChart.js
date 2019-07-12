import React, { Component, createRef } from 'react';
import * as d3 from 'd3';

import colorCodes from '../../utils/colorCodes';


class TimeLineChart extends Component {

	margin = { top: 50, right: 50, bottom: 50, left: 50 };

	constructor(props) {
		super(props);

		this.group = createRef();
		this.xAxis = createRef();
		this.yAxis = createRef();
	}

	draw() {
		const xScale = d3
			.scaleTime()
			.domain(this.props.domainX)
			.range([0, this.props.width - this.margin.left - this.margin.right]);
		
		const yScale = d3
			.scaleLinear()
			.domain(this.props.domainY)
			.range([this.props.height - this.margin.top - this.margin.bottom, 0]);

		const line = d3
			.line()
			.x((datum, idx) => xScale(idx))
			.y(datum => yScale(datum.y));

		d3
			.select(this.xAxis.current)
			.call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y")));

		d3
			.select(this.yAxis.current)
			.call(d3.axisLeft(yScale));
		
		d3
			.select(this.group.current)
			.selectAll('.line')
			.data(this.props.data)
			.join('path')
			.attr('class', datum => `line ${datum.party}`)
			.attr('stroke', datum => colorCodes.get(datum.party))
			.style('opacity', datum => this.props.highlight.has(datum.party) ? 1 : .1)
			.transition()
			.duration(1000)
			.attr('d', datum => line(datum.scores));
	}

	componentDidMount() {
		this.draw();
	}

	componentDidUpdate(prevProps) {
		if (this.props.data !== prevProps.data || this.props.highlight !== prevProps.highlight)
			this.draw();
	}

	render() {

		return (
			<svg className="line-chart" width={this.props.width} height={this.props.height}>
				<g ref={this.group} transform={`translate(${this.margin.left}, ${this.margin.top})`}>
					<g ref={this.xAxis} className="x axis" transform={`translate(0, ${this.props.height - this.margin.top - this.margin.bottom})`}></g>
					<g ref={this.yAxis} className="y axis"></g>
				</g>
			</svg>
		);
	}
}

export default TimeLineChart;

