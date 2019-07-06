import React from 'react';


class Slider extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.update(event.target.value);
	}

	render() {
		return (
			<input
				type="range"
				className="w-100"
				min={this.props.min}
				max={this.props.max}
				onChange={this.handleChange}
				value={this.props.value}
				disabled={this.props.disabled}/>
		)
	}
}

export default Slider;
