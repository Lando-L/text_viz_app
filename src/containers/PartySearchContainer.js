import { connect } from 'react-redux';

import { fetchQuery } from '../actions/PartySearchActions';


const mapStateToProps = state => state.party.toJS();

const mapDispatchToProps = { fetchQuery };

export default connect(mapStateToProps, mapDispatchToProps);
