import React from 'react';
import statemachine from '../statemachine';

var NewRoute = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function() {
    return (
      <div>
        <div id="map"></div>
        <p>New Route</p>
        <div id="list"></div>
      </div>
    );
  }
});

module.exports = {
  NewRoute: NewRoute
};
