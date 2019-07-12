import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import * as d3 from 'd3';

import colorCodes from '../../utils/colorCodes';


class BubbleChart extends Component {
	constructor(props) {
		super(props);
		
		// SVG references
		this.view = createRef();
		this.bubbles = createRef();
		this.labels = createRef();

		// Function bindings
		this.highlight = this.highlight.bind(this);
		this.undoHighlighting = this.undoHighlighting.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
		this.handleZoom = this.handleZoom.bind(this);
		
		// Scales
		this.xScale = d3.scaleLinear().domain([-5, 105]).range([0, props.width]);
		this.yScale = d3.scaleLinear().domain([-5, 105]).range([props.height, 0]);
		this.radiusScale = d3.scaleLinear().domain([0, 100]).range([ 0, 40]);
		this.fontSizeScale = d3.scaleLinear().domain([0, 100]).range([ 0, 40]);

		// Zoom
		this.zoom = d3.zoom().scaleExtent([.25, 100]).extent([[0, 0], [props.width, props.height]]).on('zoom', this.handleZoom);

		// State
		this.state = { zoomedScaleX: this.xScale, zoomedScaleY: this.yScale };
	}


	draw() {
    	d3
    		.select(this.bubbles.current)
    		.selectAll('.bubble')
    		.data(this.props.bubbles)
    		.join('circle')
    		.attr('class', bubble => `bubble ${bubble.party[this.props.year]}`)
      		.attr('cx', bubble => this.state.zoomedScaleX(bubble.x[this.props.option]))
      		.attr('cy', bubble => this.state.zoomedScaleY(bubble.y[this.props.option]))
      		.attr('r', bubble => this.radiusScale(bubble.size[this.props.year]))
      		.style('fill', bubble => colorCodes.get(bubble.party[this.props.year]))
      		.on('click', this.handleClick)
      		.on('dblclick', this.handleDoubleClick);

        d3
        	.select(this.labels.current)
        	.selectAll('.label')
        	.data(this.props.bubbles)
			.join('text')
			.attr('class', bubble => `label ${bubble.party[this.props.year]}`)
			.attr('x', bubble => this.state.zoomedScaleX(bubble.x[this.props.option]))
      		.attr('y', bubble => this.state.zoomedScaleY(bubble.y[this.props.option]))
			.attr('text-anchor', 'left')
			.attr("font-size", bubble => this.fontSizeScale(bubble.size[this.props.year]))
			.style('fill', bubble => colorCodes.get(bubble.party[this.props.year]))
			.text(bubble => bubble.label)
			.on('click', this.handleClick)
			.on('dblclick', this.handleDoubleClick);
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
			.attr('cx', bubble => this.state.zoomedScaleX(bubble.x[this.props.option]))
      		.attr('cy', bubble => this.state.zoomedScaleY(bubble.y[this.props.option]))
      		.attr('r', bubble => this.radiusScale(bubble.size[this.props.year]))
      		.style('fill', bubble => colorCodes.get(bubble.party[this.props.year]));

  		d3
			.select(this.labels.current)
			.selectAll('.label')
			.data(this.props.bubbles)
			.join()
			.transition()
			.duration(1000)
			.attr('class', bubble => `label ${bubble.party[this.props.year]}`)
			.attr('x', bubble => this.state.zoomedScaleX(bubble.x[this.props.option]))
      		.attr('y', bubble => this.state.zoomedScaleY(bubble.y[this.props.option]))
      		.style('fill', bubble => colorCodes.get(bubble.party[this.props.year]))
      		.attr("font-size", bubble => this.fontSizeScale(bubble.size[this.props.year]));
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

		this.props.toggleHighlighting(bubble.party[this.props.year]);
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

		this.props.toggleHighlighting(bubble.party[this.props.year]);
	}

	handleClick(bubble) {
		if (this.props.highlight)
			this.undoHighlighting(bubble);
		else
			this.highlight(bubble);
	}

	handleDoubleClick(bubble) {
		this.props.history.push(`/search/words/${bubble.label}`);
	}

	handleZoom() {
		const zoomedScaleX = d3.event.transform.rescaleX(this.xScale);
		const zoomedScaleY = d3.event.transform.rescaleY(this.yScale);
		
		d3
			.select(this.bubbles.current)
			.selectAll('.bubble')
			.data(this.props.bubbles)
			.attr('cx', bubble => zoomedScaleX(bubble.x[this.props.option]))
      		.attr('cy', bubble => zoomedScaleY(bubble.y[this.props.option]));


		d3
			.select(this.labels.current)
			.selectAll('.label')
			.data(this.props.bubbles)
			.attr('x', bubble => zoomedScaleX(bubble.x[this.props.option]))
      		.attr('y', bubble => zoomedScaleY(bubble.y[this.props.option]));

  		this.setState({ zoomedScaleX, zoomedScaleY });
	}


	componentDidMount() {
		this.draw();
		this.zoom(d3.select(this.view.current));
	}

	componentDidUpdate(prevProps) {
		if (this.props.option !== prevProps.option || this.props.year !== prevProps.year) {
			this.update();
			this.zoom(d3.select(this.view.current));
		}
	}

	render() {
		return (
			<svg className="bubble-chart" width={this.props.width} height={this.props.height}>
				<g>
					<rect ref={this.view} width={this.props.width} height={this.props.height} style={{ fill: 'none', pointerEvents: 'all' }}></rect>
					<g ref={this.bubbles}></g>
					<g ref={this.labels}></g>
				</g>
			</svg>
		);
	}
}

export default withRouter(BubbleChart);
