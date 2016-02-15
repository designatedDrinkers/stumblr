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
    methods.hideMap();
    var component = this;
    ajax.get('/api/barroutes/' + this.props.params.index).then(function(result) {
      component.setState(statemachine.updateState('currentRoute', result.route));
    });
  },
  render: function() {
    var status = isRouteComplete((this.state.currentRoute || {}).bars);
    if (status){
      return (
        <div>
          <h1>Route Complete!</h1>
          <h2>You earned a badge...</h2>
          <img src="#" alt="badge icon" />
          <button className="btn btn-uber">Call an Uber</button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Route Forfeited.</h1>
          <h2>You earned a badge...</h2>
          <img src="#" alt="badge icon" />
          <button className="btn btn-uber">Call an Uber</button>
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

module.exports = {
  RouteComplete: RouteComplete
};
