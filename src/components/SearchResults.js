import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';

import SearchContainer from '../containers/SearchContainer';


class SearchResults extends Component {
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
			this.props.fetchQuery(this.props.match.params.q, this.props.domains[this.props.domain]);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.match.params.q !== prevProps.match.params.q || this.props.domain !== prevProps.domain) {
			this.props.fetchQuery(this.props.match.params.q, this.props.domains[this.props.domain]);
		}
	}

	render() {
		return (
			<div className="row h-100">
				<div className="shadow-sm rounded floating-container float-top float-left">

					<form onSubmit={this.handleSubmit}>
						<div className="input-group">
							<div className="input-group-prepend">
								<button
									className="btn btn-outline-info dropdown-toggle"
									type="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									{ this.props.domains[this.props.domain].label }
								</button>
								<div className="dropdown-menu">
									{ this.props.domains.map((domain, idx) => (
										<button
											key={`domain-${idx}`}
											className="dropdown-item btn btn-link"
											onClick={() => this.props.selectDomain(idx)}>
											{ domain.label }
										</button>
									))}
								</div>
							</div>

							<input
								ref={this.input}
								className="form-control"
								name="word"
								type="text"
								defaultValue={this.props.match.params.q}
								placeholder="Search"/>

							<div className="input-group-append">
	    						<button className="btn btn-info" type="submit">Search</button>
	  						</div>
						</div>
					</form>
				</div>

				<div className="floating-container float-top float-right">
					<Link to="/bubbles">Overview</Link>
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

export default SearchContainer(SearchResults);
