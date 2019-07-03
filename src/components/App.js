import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Bubbles from './Bubbles';
import Home from './Home';
import WordSearchResults from './WordSearchResults';
import WordSearchForm from './WordSearchForm';

import '../styles/App.css';


const App = () => (
    <Router>
        <div className="app container-fluid h-100">
            <div className="content h-100">
                <Route path={'/search/:q'} component={WordSearchResults}/>
                <Route path={'/search'} exact component={WordSearchForm}/>
                <Route path={'/bubbles'} exact component={Bubbles}/>
                <Route path="/" exact component={Home}/>
            </div>
        </div>
    </Router>
);

export default App;
