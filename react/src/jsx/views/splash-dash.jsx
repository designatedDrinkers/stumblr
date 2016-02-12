import React from 'react';
import ReactDOM from 'react-dom';
import statemachine from '../statemachine';
import { RouteForm } from './newroute';
import { RouteList } from './route-list-component';
import { Header } from '../header';

var Login = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function(){
    return (
      <main>
        <div className="splash">
          <img className="splash-map" src="images/map.jpg" />
          <a href="/auth/twitter"><button className="btn btn-primary" className="btn btn-primary btn-lg">Login with Twitter</button></a>
        </div>
      </main>
    );
  }
});

var Dashboard = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function(){
    return (
      <div className="dash">
        <img className="profile-image" src={this.state.user.twitter_image} />
        <p>{this.state.user.twitter_name}</p>
        <RouteForm />
        <RouteList />
      </div>
    );
  }
});

var SplashDash = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  componentDidMount: function() {
    if (this.state.user) {
      statemachine.setMenu('dash');
    } else {
      statemachine.setMenu('none');
    }
    ReactDOM.render(<Header />, document.getElementById('header'));
  },
  render: function() {
    if (this.state.user) {
      return <Dashboard />
    } else {
      return <Login />
    }
  }
});

module.exports = {
  SplashDash: SplashDash
};
