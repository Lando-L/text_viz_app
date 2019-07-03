import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';

import WordSearchContainer from '../containers/WordSearchContainer';


class WordSearchResults extends Component {
	constructor(props) {
		super(props);
		this.input = createRef();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.history.push(this.props.match.path.replace(':q', this.input.current.value));
	}

	componentDidMount() {
		if (this.props.match.params.q) {
			this.props.fetchQuery(this.props.match.params.q);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.q !== prevProps.match.params.q) {
			this.props.fetchQuery(this.props.match.params.q);
		}
	}

	render() {
		return (
			<div className="row h-100">
				<div className="shadow-sm rounded floating-container float-left">

					<form onSubmit={this.handleSubmit}>
						<div className="input-group">
							<input
							ref={this.input}
							className="form-control"
							name="word"
							type="text"
							defaultValue={this.props.match.params.q}
							placeholder="Search"/>

							<div class="input-group-append">
	    						<button class="btn btn-info" type="submit">Search</button>
	  						</div>
						</div>
					</form>
				</div>

				<div className="floating-container float-right">
					<Link to="/">Home</Link>
				</div>

				<div className="col d-flex flex-column justify-content-center align-items-center">
					<p>
						{ JSON.stringify(this.props.results) || 'Loading...' }
					</p>
				</div>
			</div>
		);
	}
}

export default WordSearchContainer(WordSearchResults);
