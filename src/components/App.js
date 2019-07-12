import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Bubbles from './Bubbles';
import Home from './Home';
import Overview from './Overview';
import PartyOverview from './PartyOverview';
import SearchForm from './SearchForm';
import SearchPartyResults from './SearchPartyResults';
import SearchWordResults from './SearchWordResults';

import '../styles/App.css';


const App = () => (
    <Router>
        <div className="app container-fluid h-100 overflow-hidden">
			<Route path="/bubbles" exact component={Bubbles}/>
            <Route path="/overview" exact component={Overview}/>
            <Route path="/parties" exact component={PartyOverview}/>
            <Route path="/search/word/:q" component={SearchWordResults}/>
			<Route path="/search/party/:q" component={SearchPartyResults}/>
			<Route path="/search" exact component={SearchForm}/>
            <Route path="/" exact component={Home}/>
        </div>
    </Router>
);

export default App;
