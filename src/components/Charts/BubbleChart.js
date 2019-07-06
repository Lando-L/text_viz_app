import React, { Component, createRef } from 'react';
import * as d3 from 'd3';

import colorCodes from '../../utils/colorCodes';


class BubbleChart extends Component {
	constructor(props) {
		super(props);

		this.margin = {top: 50, right: 50, bottom: 50, left: 50}
		
		this.bubbles = createRef();
		this.labels = createRef();

		this.x = d3.scaleLinear().domain([-5, 105]).range([0, props.width - this.margin.left - this.margin.right])
		this.y = d3.scaleLinear().domain([-5, 105]).range([props.height - this.margin.top - this.margin.bottom, 0]);
	}


	draw() {
    	d3
    		.select(this.bubbles.current)
    		.selectAll('.bubble')
    		.data(this.props.bubbles)
    		.join('circle')
    		.attr('class', bubble => `bubble ${bubble.party}`)
      		.attr('cx', bubble => this.x(bubble.x[this.props.option]))
      		.attr('cy', bubble => this.y(bubble.y[this.props.option]))
      		.attr('r', bubble => bubble.size[this.props.year])
      		.style('fill', bubble => colorCodes.get(bubble.party));

        d3
        	.select(this.labels.current)
        	.selectAll('.label')
        	.data(this.props.bubbles)
			.join('text')
			.attr('class', bubble => `label ${bubble.party}`)
			.attr('x', bubble => this.x(bubble.x[this.props.option]))
      		.attr('y', bubble => this.y(bubble.y[this.props.option]))
			.attr('font-size', bubble => bubble.fontsize)
			.attr('text-anchor', 'left')
			.style('fill', bubble => colorCodes.get(bubble.party))
			.text(bubble => bubble.label);
	}

	update() {
		d3
			.select(this.bubbles.current)
			.selectAll('.bubble')
			.data(this.props.bubbles)
			.join()
			.transition()
			.duration(1000)
			.attr('cx', bubble => this.x(bubble.x[this.props.option]))
      		.attr('cy', bubble => this.y(bubble.y[this.props.option]))
      		.attr('r', bubble => bubble.size[this.props.year]);

  		d3
			.select(this.labels.current)
			.selectAll('.label')
			.data(this.props.bubbles)
			.join()
			.transition()
			.duration(1000)
			.attr('x', bubble => this.x(bubble.x[this.props.option]))
      		.attr('y', bubble => this.y(bubble.y[this.props.option]))
      		.attr('r', bubble => bubble.size[this.props.year]);
	}



	componentDidMount() {
		this.draw();
	}

	componentDidUpdate(prevProps) {
		if (this.props.option !== prevProps.option || this.props.year !== prevProps.year) {
			this.update();
		}
	}

	render() {
		return (
			<svg viewBox={[0, 0, this.props.width, this.props.height]}>
				<g ref={this.bubbles}></g>
				<g ref={this.labels}></g>
			</svg>
		);
	}
}

export default BubbleChart;
