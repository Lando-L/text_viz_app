import React from 'react';
import * as d3 from 'd3';

import colorCodes from '../utils/colorCodes';
import ElectionResultsContainer from '../containers/ElectionResultsContainer';


class BarChart extends React.Component {

	margin = { top: 20, right: 0, bottom: 30, left: 40 }

	constructor(props){
		super(props);
		this.bars = React.createRef();
		this.xAxis = React.createRef();
		this.yAxis = React.createRef();
	}

	draw() {
		const x = d3
			.scaleBand()
			.domain(Array.from(this.props.electionResults.keys()))
			.range([this.margin.left, this.props.width - this.margin.right])
			.padding(0.1)
		

		const y = d3
			.scaleLinear()
			.domain([0, 100])
			.nice()
			.range([this.props.height - this.margin.bottom, this.margin.top])

		this.drawXAxis(x)
		this.drawYAxis(y)
		this.drawBars(x, y)
	}

	drawXAxis(x) {
		d3
			.select(this.xAxis.current)
			.attr('transform', 'translate(0,' + (this.props.height - this.margin.bottom) + ')')
			.call(d3.axisBottom(x).tickSizeOuter(0));
	}

	drawYAxis(y) {
		d3
			.select(this.yAxis.current)
			.attr('transform', 'translate(' + this.margin.left + ',0)')
			.call(d3.axisLeft(y))
			.call(yAxis => yAxis.select('.domain').remove())
	}

	drawBars(x, y){
		d3
			.select(this.bars.current)
			.selectAll('rect')
		    .data(Array.from(this.props.electionResults.map((value, key) => ({ name: key, percentage: value })).values()))
		    .join('rect')
			.attr('x', d => x(d.name))
			.attr('y', d => y(d.percentage))
			.attr('height', d => y(0) - y(d.percentage))
			.attr('width', x.bandwidth())
			.attr('fill', d => colorCodes.get(d.name));

		d3
			.select(this.bars.current)
			.node();
	}

	componentDidMount(){
		this.draw();
	}

	componentDidUpdate(prevProps) {
	  if (this.props.electionResults !== prevProps.electionResults) {
	    this.draw();
	  }
	}

	render() {
		return (
			<svg width={this.props.width} height={this.props.height}>
				<g ref={this.bars}></g>
				<g ref={this.xAxis}></g>
				<g ref={this.yAxis}></g>
			</svg>
		);
	}
}

export default ElectionResultsContainer(BarChart);
