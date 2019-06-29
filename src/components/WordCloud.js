import React from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

import colorCodes from '../utils/colorCodes';
import WordCloudContainer from '../containers/WordCloudContainer';


class WordCloud extends React.Component {
	constructor(props) {
		super(props);
		this.group = React.createRef();
		this.draw = this.draw.bind(this);
	}

	draw(words) {
		d3
			.select(this.group.current)
			.selectAll('text')
			.data(words)
			.join('text')
			.style('font-size', d => d.size + 'px')
			.attr('fill', d => colorCodes.get(d.name))
			.attr('text-anchor', 'text-middle')
			.attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
			.text(d => d.word);
	}

	setLayout() {
		cloud()
			.size([this.props.width, this.props.height])
			.words(this.props.words.toJS())
			.padding(5)
			.rotate(0)
			.fontSize(d => d.frequency * this.props.electionResults.get(d.name))
			.on('end', this.draw)
			.start();
	}

	componentDidMount(){
		this.setLayout();
	}

	componentDidUpdate(prevProps) {
	  if (this.props.electionResults !== prevProps.electionResults) {
	    this.setLayout();
	  }
	}

	render() {
		return (
			<svg width={this.props.width} height={this.props.height}>
				<g ref={this.group} transform={'translate(' + (this.props.width / 2)+ ', ' + (this.props.height / 2) + ')'}></g>
			</svg>
		);
	}
}

export default WordCloudContainer(WordCloud);
