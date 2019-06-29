import React from 'react'

import Slider from './Slider';
import SliderListContainer from '../containers/SliderListContainer';


const SliderList = ({ electionResults, update, reset }) => (
	<div className="card">
		<div className="card-body">
			<form>
				{Array.from(electionResults.entries()).map(entry => (
					<div key={"slider-" + entry[0]} className="form-group row">
						<label className="col-2 col-form-label">{entry[0]}</label>
						<div className="col-10">
							<Slider
								min="0"
								max="100"
								name={entry[0]}
								value={entry[1]}
								update={percentage => update(entry[0], percentage)}/>

							<h6 className="card-subtitle mb-2 text-muted">
								{Math.round(entry[1] * 10) / 10}
							</h6>
						</div>
					</div>
				))}
				<button type="button" className="btn btn-primary" onClick={reset}>Reset</button>
			</form>
		</div>
	</div>
);

export default SliderListContainer(SliderList);
