import { connect } from 'react-redux';

import { update, reset } from '../actions/ElectionResultsActions';


const mapStateToProps = state => ({
	electionResults: state.electionResults
});

const mapDispatchToProps = { update, reset };

export default connect(
	mapStateToProps,
	mapDispatchToProps
);
