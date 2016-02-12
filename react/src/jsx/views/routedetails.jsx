import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../header';
import statemachine from '../statemachine';

var RouteDetails = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  componentDidMount: function() {
    statemachine.setMenu('def');
    ReactDOM.render(<Header />, document.getElementById('header'));
  },
  render: function() {
    return (
      <div>
        <div id="map"></div>
        <p>Route Details</p>
        <div id="list"></div>
      </div>
    );
  }
});
