import React from 'react';
import statemachine from '../statemachine';

var RouteDetails = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
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
