import React, { Component, createRef } from 'react';
import * as d3 from 'd3';

import colorCodes from '../../utils/colorCodes';


class BubbleChart extends Component {
	constructor(props) {
		super(props);

		this.margin = {top: 50, right: 50, bottom: 50, left: 50}
		
		this.group = createRef();
		this.bubbles = createRef();
		this.labels = createRef();

		this.x = d3.scaleLinear().domain([-5, 105]).range([0, props.width - this.margin.left - this.margin.right]);
		this.y = d3.scaleLinear().domain([-5, 105]).range([props.height - this.margin.top - this.margin.bottom, 0]);

		this.state = { highlighting: false };

		this.highlight = this.highlight.bind(this);
		this.undoHighlighting = this.undoHighlighting.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}


	draw() {
    	d3
    		.select(this.bubbles.current)
    		.selectAll('.bubble')
    		.data(this.props.bubbles)
    		.join('circle')
    		.attr('class', bubble => `bubble ${bubble.party[this.props.year]}`)
      		.attr('cx', bubble => this.x(bubble.x[this.props.option]))
      		.attr('cy', bubble => this.y(bubble.y[this.props.option]))
      		.attr('r', bubble => bubble.size[this.props.year])
      		.style('fill', bubble => colorCodes.get(bubble.party[this.props.year]))
      		.on('click', this.handleClick);

        d3
        	.select(this.labels.current)
        	.selectAll('.label')
        	.data(this.props.bubbles)
			.join('text')
			.attr('class', bubble => `label ${bubble.party[this.props.year]}`)
			.attr('x', bubble => this.x(bubble.x[this.props.option]))
      		.attr('y', bubble => this.y(bubble.y[this.props.option]))
			.attr('text-anchor', 'left')
			.style('fill', bubble => colorCodes.get(bubble.party[this.props.year]))
			.text(bubble => bubble.label)
			.on('click', this.handleClick);
	}

	update() {
		d3
			.select(this.bubbles.current)
			.selectAll('.bubble')
			.data(this.props.bubbles)
			.join()
			.transition()
			.duration(1000)
			.attr('class', bubble => `bubble ${bubble.party[this.props.year]}`)
			.attr('cx', bubble => this.x(bubble.x[this.props.option]))
      		.attr('cy', bubble => this.y(bubble.y[this.props.option]))
      		.attr('r', bubble => bubble.size[this.props.year])
      		.style('fill', bubble => colorCodes.get(bubble.party[this.props.year]));

  		d3
			.select(this.labels.current)
			.selectAll('.label')
			.data(this.props.bubbles)
			.join()
			.transition()
			.duration(1000)
			.attr('class', bubble => `label ${bubble.party[this.props.year]}`)
			.attr('x', bubble => this.x(bubble.x[this.props.option]))
      		.attr('y', bubble => this.y(bubble.y[this.props.option]))
      		.attr('r', bubble => bubble.size[this.props.year])
      		.style('fill', bubble => colorCodes.get(bubble.party[this.props.year]));
	}

	highlight(bubble) {
		d3
			.select(this.bubbles.current)
			.selectAll('.bubble')
			.style('opacity', '0.05');

		d3
			.select(this.labels.current)
			.selectAll('.label')
			.style('opacity', '0.05');

		d3
			.select(this.bubbles.current)
			.selectAll(`.${bubble.party[this.props.year]}`)
			.style('opacity', '0.8')

		d3
			.select(this.labels.current)
			.selectAll(`.${bubble.party[this.props.year]}`)
			.style('opacity', '0.9');

		this.setState({ highlighting: true });
	}

	undoHighlighting(bubble) {
		d3
			.select(this.bubbles.current)
			.selectAll('.bubble')
			.style('opacity', '0.8');

		d3
			.select(this.labels.current)
			.selectAll('.label')
			.style('opacity', '0.9');

		this.setState({ highlighting: false })
	}

	handleClick(bubble) {
		if (this.state.highlighting)
			this.undoHighlighting(bubble);
		else
			this.highlight(bubble);
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
			<svg width={this.props.width} height={this.props.height}>
				<g ref={this.group}>
					<g ref={this.bubbles}></g>
					<g ref={this.labels}></g>
				</g>
			</svg>
		);
	}
}

export default BubbleChart;
