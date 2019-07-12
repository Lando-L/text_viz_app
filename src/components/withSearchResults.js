import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';


const withSearchResults = (WrappedComponent, idx) => {
	return class extends Component {

		domains = [
			{ slug: 'words', label: 'Word' },
			{ slug: 'parties', label: 'Party' }
		]

		constructor(props) {
			super(props);
			this.input = createRef();
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleDomainChange = this.handleDomainChange.bind(this);
		}

		handleSubmit(event) {
			event.preventDefault();
			this.props.history.push(`/search/${this.domains[idx].slug}/${this.input.current.value}`);
		}

		handleDomainChange(domain) {
			return event => {
				if (domain !== this.domains[idx].slug) {
					this.props.history.push(`/search/${domain}/${this.input.current.value}`)
				}
			}
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
				<div className="row h-100 overflow-auto">
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
										{ this.domains[idx].slug }
									</button>
									<div className="dropdown-menu">
										{ this.domains.map(domain => (
											<button
												key={`domain-${domain.slug}`}
												className="dropdown-item btn btn-link"
												onClick={this.handleDomainChange(domain.slug)}>
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
						<Link to="/">Home</Link>
					</div>

					<WrappedComponent {...this.props}/>
				</div>
			);
		}
	}
}

export default withSearchResults;
