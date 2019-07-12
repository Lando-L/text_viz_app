import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import * as d3 from 'd3';

import colorCodes from '../../utils/colorCodes';


class ManifestoBubbleChart extends Component {
	constructor(props) {
		super(props);
		
		// SVG references
		this.view = createRef();
		this.bubbles = createRef();
		this.labels = createRef();

		// Function bindings
		this.handleClick = this.handleClick.bind(this);
		this.handleDoubleClick = this.handleDoubleClick.bind(this);
		this.handleZoom = this.handleZoom.bind(this);
		
		// Scales
		this.x = d3.scaleLinear().domain([-5, 105]).range([0, props.width]);
		this.y = d3.scaleLinear().domain([-5, 105]).range([props.height, 0]);
		this.radius = d3.scaleLinear().domain([0, 100]).range([ 0, 40]);
		this.label = d3.scaleLinear().domain([0, 100]).range([ 0, 40]);

		// Zoom
		this.zoom = d3.zoom().scaleExtent([.25, 100]).extent([[0, 0], [props.width, props.height]]).on('zoom', this.handleZoom);

		// State
		this.state = { zoomedX: this.x, zoomedY: this.y };
	}

	draw() {
    	d3
    		.select(this.bubbles.current)
    		.selectAll('.bubble')
    		.data(this.props.bubbles)
    		.join('circle')
    		.attr('class', bubble => `bubble ${bubble.party}`)
      		.attr('cx', bubble => this.state.zoomedX(bubble.x))
      		.attr('cy', bubble => this.state.zoomedY(bubble.y))
      		.attr('r', bubble => this.radius(bubble.size))
      		.style('fill', bubble => colorCodes.get(bubble.party))
      		.on('dblclick', this.handleDoubleClick);

        d3
        	.select(this.labels.current)
        	.selectAll('.label')
        	.data(this.props.bubbles)
			.join('text')
			.attr('class', bubble => `label ${bubble.party}`)
			.attr('x', bubble => this.state.zoomedX(bubble.x))
      		.attr('y', bubble => this.state.zoomedY(bubble.y))
			.attr('text-anchor', 'left')
			.attr("font-size", bubble => this.label(bubble.size))
			.style('fill', bubble => colorCodes.get(bubble.party))
			.text(bubble => bubble.label)
			.on('dblclick', this.handleDoubleClick);
	}

	handleDoubleClick(bubble) {
		this.props.history.push(`/search/party/${bubble.party}`);
	}

	handleZoom() {
		const zoomedX = d3.event.transform.rescaleX(this.x);
		const zoomedY = d3.event.transform.rescaleY(this.y);
		
		d3
			.select(this.bubbles.current)
			.selectAll('.bubble')
			.data(this.props.bubbles)
			.attr('cx', bubble => zoomedX(bubble.x))
      		.attr('cy', bubble => zoomedY(bubble.y));


		d3
			.select(this.labels.current)
			.selectAll('.label')
			.data(this.props.bubbles)
			.attr('x', bubble => zoomedX(bubble.x))
      		.attr('y', bubble => zoomedY(bubble.y));

  		this.setState({ zoomedX, zoomedY });
	}


	componentDidMount() {
		this.draw();
		this.zoom(d3.select(this.view.current));
	}

	componentDidUpdate(prevProps) {
		if (this.props.bubbles !== prevProps.bubbles) {
			this.draw();
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

export default withRouter(ManifestoBubbleChart);
