import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
	<div className="row">
		<div className="col">
			<ul>
				<li>
					<Link to="/search">Search</Link>
				</li>
				<li>
					<Link to="/bubbles">Bubbles</Link>
				</li>
			</ul>
		</div>
	</div>
);

export default Home;
