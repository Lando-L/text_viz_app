import React from 'react';

import BarChart from './BarChart';
import PieChart from './PieChart';
import Settings from './Settings';
import SliderList from './SliderList';
import WordCloud from './WordCloud';

import '../styles/App.css';


export default () => (
    <div className="app container-fluid h-100">
        <div className="row h-100">
            <div className="word-cloud col-9">
                <WordCloud width="1000" height="500"/>
            </div>
            <div className="election-results col-3 d-flex flex-column align-items-center">
                <h1 className="mt-3 mb-5 text-center">Election results 2017</h1>
                <PieChart width="200" height="200"/>
                <BarChart width="300" height="200"/>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#settings">Update</button>
            </div>
        </div>

        <Settings id="settings">
            <SliderList/>
        </Settings>
    </div>
);

/*

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
*/
