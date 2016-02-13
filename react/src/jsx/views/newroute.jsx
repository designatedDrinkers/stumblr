import React from 'react';
// import ReactDOM from 'react-dom';
import statemachine from '../statemachine';
import routeData from '../barroute-data';
import ajax from 'ajax-promise';
// import { Header } from '../header';

var NewRoute = React.createClass({
  getInitialState: function() {
    return { loading: true, newName: '' };
  },
  componentDidMount: function() {
    // statemachine.setMenu('def');
    // ReactDOM.render(<Header />, document.getElementById('header'));
    var component = this;
    var route = statemachine.getState().routeToBe;
    routeData(route.barcount, route.start)
    .then(function(good) {
      component.setState({ loading: false, newName: '' });
      console.log(good);
    }).catch(function(bad) {
      component.setState({ loading: false, newName: '' });
      console.error(bad);
    });
  },
  saveRoute: function(event) {
    event.preventDefault();
    var route = statemachine.getState().newBarRoute;
    ajax.post('/api/barroutes', {
      name: this.state.newName,
      bars: JSON.stringify(route)
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
    this.setState({ loading: false, newName: event.target.value });
  },
  render: function() {
    if (this.state.loading) {
      return (
        <p>Loading...</p>
      );
    } else {
      return (
        <div>
          <input value={this.state.newName} onChange={this.changeName} placeholder="Enter Route Name (optional)" />
          <button className="btn btn-primary" onClick={this.saveRoute}>Save</button>
          <button className="btn btn-primary" onClick={this.goDashboard}>Cancel</button>
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
    console.log(this.state);
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
