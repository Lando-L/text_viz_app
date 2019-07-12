import { connect } from 'react-redux';

import { selectOption, selectYear, toggleHighlighting, fetchBubbles } from '../actions/BubblesActions';


const mapStateToProps = state => state.bubbles.toJS();
const mapDispatchToProps = { selectOption, selectYear, toggleHighlighting, fetchBubbles };

export default connect(mapStateToProps, mapDispatchToProps);
