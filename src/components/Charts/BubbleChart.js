import React from 'react';
import * as d3 from 'd3';

import colorCodes from '../../utils/colorCodes';


const BubbleChart = ({ bubbles, width, height}) => {
	const x = d3
		.scaleLinear()
		.domain([-5, 105])
		.range([0, width]);

	const y = d3
		.scaleLinear()
		.domain([-5, 105])
		.range([height, 0]);

	return (
		<svg width={width} height={height}>
			<g>
				{bubbles.map((bubble, idx) => (
					<circle
						key={`circle-${idx}`}
						className={`bubble ${bubble.party}`}
						cx={x(bubble.x)}
						cy={y(bubble.y)}
						r={bubble.size}
						style={{ fill: colorCodes.get(bubble.party), 'stroke': 'white' }}>
					</circle>
				))}
			</g>
			<g>
				{bubbles.map((bubble, idx) => (
					<text
						key={`label-${idx}`}
						className={`label ${bubble.party}`}
						x={x(bubble.x)}
						y={y(bubble.y)}
						textAnchor="left"
						style={{ fill: colorCodes.get(bubble.party), fontSize: bubble.fontSize }}>
						2017
					</text>
				))}
			</g>
		</svg>
	);
}

export default BubbleChart;
