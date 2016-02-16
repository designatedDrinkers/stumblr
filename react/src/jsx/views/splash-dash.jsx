import React from 'react';
import ReactDOM from 'react-dom';
import statemachine from '../statemachine';
import { RouteForm } from './newroute';
import { RouteList } from './route-list-component';
import { Header } from '../header';
import methods from '../methods';

var Login = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function(){
    return (
      <main>
        <div className="splash">
          <img className="splash-map" src="images/map.jpg" />
          <a href="/auth/twitter"><button className="btn btn-primary btn-lg">Login with Twitter</button></a>
        </div>
      </main>
    );
  }
});

var Dashboard = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  componentDidMount: function() {
    this.setState(statemachine.getState());
  },
  render: function() {
    var badges = (this.state.user.badges || []).map(function(badge, i) {
      var style = {
        backgroundImage: 'url(' + badge.image + ')'
      };
      return (
        <li className="badge" key={i}>
          <div style={style} className="badge-count">
            <span className="quantity">{badge.quantity}</span>
          </div>
        </li>
      );
    })
    return (
      <div className="dash">
        <div className="user-details">
          <div className="twitter-info">
            <img className="profile-image" src={this.state.user.twitter_image} />
            <p>{this.state.user.twitter_name}</p>
          </div>
          <ul className="badges">
            {badges}
          </ul>
        </div>
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
    methods.hideMap();
    this.setState(statemachine.getState());
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
