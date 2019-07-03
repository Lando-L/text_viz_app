import { connect } from 'react-redux';

import { fetchBubbles } from '../actions/ManifestoBubblesActions';


const mapStateToProps = state => state.manifestoBubbles.toJS();
const mapDispatchToProps = { fetchBubbles };

export default connect(mapStateToProps, mapDispatchToProps);
