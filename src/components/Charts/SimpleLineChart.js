import React, { Component, createRef } from 'react';
import * as d3 from 'd3';


class SimpleLineChart extends Component {

	margin = { top: 50, right: 50, bottom: 50, left: 50 };

	constructor(props) {
		super(props);

		this.group = createRef();
		this.xAxis = createRef();
		this.yAxis = createRef();

		this.xScale = d3
			.scaleTime()
			.domain(this.props.domainX)
			.range([0, this.props.width - this.margin.left - this.margin.right]);
		
		this.yScale = d3
			.scaleLinear()
			.domain(this.props.domainY)
			.range([props.height - this.margin.top - this.margin.bottom, 0]);

		this.line = d3
			.line()
			.x((datum, idx) => this.xScale(idx))
			.y(datum => this.yScale(datum.y))
			.curve(d3.curveMonotoneX);
	}

	draw() {
		d3
			.select(this.xAxis.current)
			.call(d3.axisBottom(this.xScale).tickFormat(d3.timeFormat("%Y")));

		d3
			.select(this.yAxis.current)
			.call(d3.axisLeft(this.yScale));
		
		
		d3
			.select(this.group.current)
			.append('path')
			.datum(this.props.data)
			.attr('class', 'line')
			.attr('d', this.line);
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
			<svg className="line-chart line-chart-simple" width={this.props.width} height={this.props.height}>
				<g ref={this.group} transform={`translate(${this.margin.left}, ${this.margin.top})`}>
					<g ref={this.xAxis} className="x axis" transform={`translate(0, ${this.props.height - this.margin.top - this.margin.bottom})`}></g>
					<g ref={this.yAxis} className="y axis"></g>
				</g>
			</svg>
		);
	}
}

SimpleLineChart.defaultProps = {
	data: Array.from(Array(10).keys()).map(idx => ({ x: idx, y: d3.randomUniform(1)() })),
	domainX: [0, 9],
	domainY: [0, 1],
	width: 600,
	height: 400
}

export default SimpleLineChart;

