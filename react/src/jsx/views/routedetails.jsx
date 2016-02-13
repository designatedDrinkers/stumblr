import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../header';
import statemachine from '../statemachine';
import ajax from 'ajax-promise';
import routeData from '../barroute-data';


var RouteDetails = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  componentDidMount: function() {
    statemachine.setMenu('def');
    ReactDOM.render(<Header />, document.getElementById('header'));
    var component = this;
    ajax.get('/api/barroutes/' + this.props.params.index).then(function(result) {
      component.setState(statemachine.updateState('currentRoute', result.route));
      routeData.recreate(result.route);
    });
  },
  skip: function(i) {
    var component = this;
    ajax.put('/api/barroutes/' + this.props.params.index, { bar_id: i, skip: true })
    .then(function(result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(statemachine.updateState('currentRoute', component.state.currentRoute));
    });
  },
  checkIn: function(i) {
    var component = this;
    ajax.put('/api/barroutes/' + this.props.params.index, { bar_id: i, check_in: true })
    .then(function(result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(statemachine.updateState('currentRoute', component.state.currentRoute));
    });
  },
  render: function() {
    var lis = composeList(this, this.state.currentRoute);
    if (lis) {
      return (
        <div>
          <p>Route Details</p>
          <ul>
            {lis}
          </ul>
        </div>
      );
    } else {
      return (
        <p>Loading...</p>
      );
    }
  }
});

module.exports = {
  RouteDetails: RouteDetails
};

function composeList(component, route) {
  if (!route) return [];
  var lis = route.bars.map(function(bar, i) {
    if (bar.checked_in || bar.skipped) {
      var status = bar.checked_in ? 'Checked In' : 'Skipped';
    }
    if (status) {
      return (
        <li key={i}>
          <p>Bar: {bar.name}</p>
          <p>Status: {status}</p>
        </li>
      );
    } else {
      var checkIn = component.checkIn.bind(component, i);
      var skip = component.skip.bind(component, i);
      return (
        <li key={i}>
          <p>Bar: {bar.name}</p>
          <p>Status: Pending</p>
          <button className="btn btn-primary" onClick={checkIn}>Check In</button>
          <button className="btn btn-primary" onClick={skip}>Skip</button>
        </li>
      );
    }
  });
  return lis;
}
