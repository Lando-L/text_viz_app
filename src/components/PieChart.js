import React from 'react';
import * as d3 from 'd3';

import colorCodes from '../utils/colorCodes'
import ElectionResultsContainer from '../containers/ElectionResultsContainer';


const PieChart = ({ electionResults, width, height }) => {
	const names = Array.from(electionResults.keys());
	const percentages = Array.from(electionResults.values());

	const colors = d3.scaleOrdinal(names.map(name => colorCodes.get(name)));

	const radius = Math.min(width, height) / 2;
	const pie = d3.pie();
	const arc = d3.arc().innerRadius(0).outerRadius(radius);

	return (
		<svg width={width} height={height}>
			<g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
				{pie(percentages).map((percentage, i) => (
					<g key={"arc-" + i} className="arc">
						<path fill={colors(i)} d={arc(percentage)}></path>
					</g>
				))}
			</g>
		</svg>
	);
};

export default ElectionResultsContainer(PieChart);
