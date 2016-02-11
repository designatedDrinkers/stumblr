import React from 'react';
import statemachine from '../statemachine';
import { RouteForm } from './newroute';

var Login = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function(){
    return (
      <a href="/auth/twitter"><button className="button">Login with Twitter</button></a>
    );
  }
});

var Dashboard = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function(){
    return (
      <div>
        <img className="profile-image" src={this.state.user.twitter_image} />
        <p>{this.state.user.twitter_name}</p>
        <RouteForm />
      </div>
    );
  }
});

var SplashDash = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
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
