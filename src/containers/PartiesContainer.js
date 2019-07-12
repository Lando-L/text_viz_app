import { connect } from 'react-redux';

import { selectOption, toggleHighlighting, fetchParties } from '../actions/PartiesActions';


const mapStateToProps = state => state.parties.toObject();

const mapDispatchToProps = {
	selectOption,
	toggleHighlighting,
	fetchParties
};

export default connect(mapStateToProps, mapDispatchToProps);
