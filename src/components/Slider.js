import React from 'react';


class Slider extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
		e.preventDefault();
		this.props.update(e.target.value);
	}

	render() {
		return (
			<input
				type="range"
				className="w-100"
				min={this.props.min}
				max={this.props.max}
				onChange={this.handleChange}
				value={this.props.value}/>
		)
	}
}

export default Slider;
