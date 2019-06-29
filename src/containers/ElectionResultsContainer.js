import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => ({
	electionResults: state.electionResults,
	width: ownProps.width,
	height: ownProps.height
});

export default connect(mapStateToProps);
