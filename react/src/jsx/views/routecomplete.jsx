import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../header';
import statemachine from '../statemachine';
import ajax from 'ajax-promise';
import methods from '../methods';

var RouteComplete = React.createClass({
  getInitialState: function(){
    return statemachine.getState();
  },
  componentDidMount: function() {
    statemachine.setMenu('def');
    ReactDOM.render(<Header />, document.getElementById('header'));
    methods.hideMap();
    var component = this;
    ajax.get('/api/barroutes/' + this.props.params.index).then(function(result) {
      component.setState(statemachine.updateState('currentRoute', result.route));
    });
  },
  render: function() {
    console.log(this.state.user);
    console.log(this.state.user.newBadges);
    var status = isRouteComplete((this.state.currentRoute || {}).bars);
    if (status){
      return (
        <div className="done-container">
          <h1 className="win">Route Complete!</h1>
          <h3>You earned a badge...</h3>
          <img src="../images/badge-placeholder.png" alt="badge icon" />
          <button className="btn">Call an Uber</button>
        </div>
      )
    } else {
      return (
        <div className="done-container">
          <h1 className="fail">Route Forfeited.</h1>
          <h3>You earned a badge...</h3>
          <Badges />
          <img src="../images/badge-placeholder.png" alt="badge icon" />
          <button className="btn">Call an Uber</button>
        </div>
      )
    }
  }
});

function isRouteComplete(barArray){
  barArray = barArray || [{}];
  return barArray.filter(function(bar) {
    return bar.checked_in;
  }).length == barArray.length;
};

var Badges = React.createClass({
  getInitialState: function(){
    return statemachine.getState();
  },
  render: function(){
    if(this.state.newBadges.length > 0){
      return this.state.newBadges.map(function(badge, i){
      return (
        <img src="{badge.image}" alt="{badge.name}" />
      );
    });
  }else{
    return null;
  }

  }
});

module.exports = {
  RouteComplete: RouteComplete
};
