import React from 'react';

import BarChart from './BarChart';
import PieChart from './PieChart';
import SliderList from './SliderList';
import WordCloud from './WordCloud';


export default () => (
    <div className="container">
        <h1 className="text-center mb-5">Which topics spark the voter's interests?</h1>
        <div className="row">
            <div className="col">
                <div className="row">
                    <div className="col">
                        <PieChart width="200" height="200"/>
                    </div>
                    <div className="col">
                        <BarChart width="200" height="200"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <WordCloud width="300" height="300"/>
                </div>
            </div>
            <div className="col">
                <SliderList/>
            </div>
        </div>
    </div>
);
