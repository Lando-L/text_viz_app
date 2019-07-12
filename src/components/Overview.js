import React from 'react';
import { Link } from 'react-router-dom';


const Overview = () => (
	<div className="row">
		<div className="col">
			<Link to="/bubbles">Bubbles</Link>
		</div>
		<div className="col">
			<Link to="/parties">Party Overview</Link>
		</div>
		<div className="col">
			<Link to="/bubbles">Bubbles</Link>
		</div>
	</div>
);

export default Overview;
