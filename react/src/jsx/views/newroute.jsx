import React from 'react';
import ReactDOM from 'react-dom';
import statemachine from '../statemachine';
import routeData from '../barroute-data';
import ajax from 'ajax-promise';
import { Header } from '../header';

var NewRoute = React.createClass({
  getInitialState: function() {
    return { loading: true, newName: '' };
  },
  componentDidMount: function() {
    statemachine.setMenu('def');
    ReactDOM.render(<Header />, document.getElementById('header'));
    var component = this;
    var route = statemachine.getState().routeToBe || {};
    routeData(route.barcount || 3, route.start || '')
    .then(function(good) {
      var bars = statemachine.getState().newBarRoute;
      component.setState({ loading: false, newName: '', bars: bars });
    }).catch(function(bad) {
      component.setState({ loading: false, newName: '' });
    });
  },
  saveRoute: function(event) {
    event.preventDefault();
    var route = statemachine.getState().newBarRoute;
    ajax.post('/api/barroutes', {
      name: this.state.newName,
      bars: JSON.stringify(route)
    }).then(function(data) {
      return ajax.get('/api/barroutes').then(function(routes) {
        statemachine.updateState('routes', routes.barRoutes);
      }).then(function() {
        return Promise.resolve(data);
      });
    }).then(function(data) {
      var url = '/#/' + (data.index ? 'routes/' + data.index : '');
      window.location.assign(url);
    }).catch(this.goDashboard);
  },
  goDashboard: function(event) {
    if (event) event.preventDefault();
    window.location.assign('/#');
  },
  changeName: function(event) {
    this.setState({ loading: false, newName: event.target.value, bars: this.state.bars });
  },
  render: function() {
    if (this.state.loading) {
      return (
        <div className="new-route">
          <i className="fa fa-spinner fa-spin"></i>
        </div>
      );
    } else {
      var bars = this.state.bars.map(function(bar, i) {
        return <li key={i}>{bar.name}</li>;
      });
      return (
        <div className="new-route">
          <form>
            <input className="form-control" value={this.state.newName} onChange={this.changeName} placeholder="Enter Route Name (optional)" />
            <button className="btn btn-primary" onClick={this.saveRoute}>Save</button>
            <button className="btn btn-primary" onClick={this.goDashboard}>Cancel</button>
          </form>
          <ul className="bar-list">
            <li key="-1">Bars</li>
            {bars}
          </ul>
        </div>
      );
    }
  }
});

var RouteForm = React.createClass({
  getInitialState: function() {
    return { start: '', barcount: 3 };
  },
  createRoute: function(event) {
    event.preventDefault();
    statemachine.updateState('routeToBe', this.state);
    window.location.assign('/#/routes/new');
  },
  changeStart: function(event) {
    this.setState({ start: event.target.value, barcount: this.state.barcount });
  },
  changeBarcount: function(event) {
    this.setState({ start: this.state.start, barcount: event.target.value });
  },
  render: function() {
    return (
      <form onSubmit={this.createRoute}>
        <label htmlFor="location">Select Starting Point:</label>
        <input className="form-control" id="location" type="text" placeholder="Use Current Location"
        onChange={this.changeStart} name="location" value={this.state.start} />
        <select className="form-control" name="barcount" onChange={this.changeBarcount} value={this.state.barcount}>
          <option value="3">Fun Run</option>
          <option value="5">5k</option>
          <option value="8">Marathon</option>
        </select>
        <button className="btn btn-primary" type="submit">Create Route</button>
      </form>
    );
  }
});

module.exports = {
  NewRoute: NewRoute,
  RouteForm: RouteForm
};
