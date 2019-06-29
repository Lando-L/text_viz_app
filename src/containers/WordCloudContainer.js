import { connect } from 'react-redux';


const mapStateToProps = (state, ownProps) => ({
	status: state.wordCloud.get('status'),
	words: state.wordCloud.get('words'),
	electionResults: state.electionResults,
	width: ownProps.width,
	height: ownProps.height
});

export default connect(mapStateToProps);
