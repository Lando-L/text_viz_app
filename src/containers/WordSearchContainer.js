import { connect } from 'react-redux';

import { selectDomain, fetchQuery } from '../actions/SearchActions';


const mapStateToProps = () => ({});
const mapDispatchToProps = {
	search: query => {
		selectDomain(0);
		fetchQuery(query)
	}
};

export default connect(mapStateToProps, mapDispatchToProps);
