import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Bubbles from './Bubbles';
import Home from './Home';
import Search from './Search';

import '../styles/App.css';


const App = () => (
    <Router>
        <div className="app container-fluid h-100">
            <div className="content h-100">
                <Route path="/search" component={Search}/>
                <Route path="/bubbles" exact component={Bubbles}/>
                <Route path="/" exact component={Home}/>
            </div>
        </div>
    </Router>
);

export default App;
