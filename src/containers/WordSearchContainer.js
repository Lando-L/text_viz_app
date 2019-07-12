import { connect } from 'react-redux';

import { fetchQuery } from '../actions/WordSearchActions';


const mapStateToProps = state => state.word.toJS();

const mapDispatchToProps = { fetchQuery }

export default connect(mapStateToProps, mapDispatchToProps);
