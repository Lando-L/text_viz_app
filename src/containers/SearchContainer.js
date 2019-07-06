import { connect } from 'react-redux';

import { selectDomain, fetchQuery } from '../actions/SearchActions';


const mapStateToProps = state => state.search.toJS();
const mapDispatchToProps = { selectDomain, fetchQuery };

export default connect(mapStateToProps, mapDispatchToProps);
