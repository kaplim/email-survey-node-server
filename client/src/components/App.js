import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // use to call action creators

import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {

	componentDidMount() { // make initial Ajax calls
		this.props.fetchUser();
	}

	render() {
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={ Landing } />
						<Route exact path="/surveys" component={ Dashboard } />
						<Route path="/surveys/new" component={ SurveyNew } />
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);