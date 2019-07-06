import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchContainer from '../containers/SearchContainer';


class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = { query: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({ query: event.target.value })
	}

	handleSubmit(domain) {
		return event => {
			event.preventDefault();
			this.props.selectDomain(domain);
			this.props.history.push(`/search/${this.state.query}`);
		}
	}

	render() {
		return (
			<div className="row h-100">
				<div className="floating-container float-right">
					<Link to="/bubbles">Overview</Link>
				</div>

				<div className="col d-flex flex-column justify-content-center align-items-center">
					<form className="d-flex flex-column justify-content-center align-items-center">
						<h1 className="text-center">What sparks the voters' interest?</h1>
						
						<div className="pt-3 pb-3 input-group input-group-lg">
							<input
							name="word"
							type="text"
							className="form-control"
							value={this.state.query}
							onChange={this.handleChange}
							placeholder="Search"/>
						</div>

						<div>
							<button className="btn btn-info mr-3" onClick={this.handleSubmit(0)}>Word Search</button>
							<button className="btn btn-info ml-3" onClick={this.handleSubmit(1)}>Party Search</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default SearchContainer(SearchForm);
