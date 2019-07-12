import { connect } from 'react-redux';

import { fetchQuery } from '../actions/SearchActions';


const mapStateToProps = state => state.search.toJS();

const mapDispatchToProps = { fetchQuery };

export default connect(mapStateToProps, mapDispatchToProps);
