import { connect } from 'react-redux';

import { selectOption, selectYear, fetchBubbles } from '../actions/BubblesActions';


const mapStateToProps = state => state.bubbles.toJS();
const mapDispatchToProps = { selectOption, selectYear, fetchBubbles };

export default connect(mapStateToProps, mapDispatchToProps);
