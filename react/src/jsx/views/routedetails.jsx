import React from 'react';
import statemachine from './statemachine';

var RouteDetails = React.createClass({
  getInitialState: function() {
    return statemachine.reducer({ user: this.props.user }, {});
  },
  render: function() {
    console.log(this.state);
    return (
      <div>
        <div id="map"></div>
        <div id="list"></div>
      </div>
    );
  }
});
