import React from 'react';
import ReactDOM from 'react-dom';
import statemachine from '../statemachine';
import ajax from 'ajax-promise';
import { Header } from '../header';
import methods from '../methods';
import stupid from 'destupidify';

var Settings = React.createClass({
  getInitialState: function() {
    var user = statemachine.getState().user;
    return { auto_tweet: String(user.auto_tweet), route_filter: user.route_filter };
  },
  componentDidMount: function() {
    methods.hideMap();
    statemachine.setMenu('settings');
    ReactDOM.render(<Header />, document.getElementById('header'));
  },
  changeTweetSettings: function(event) {
    this.setState({ auto_tweet: event.target.value, route_filter: this.state.route_filter });
  },
  changeFilterSettings: function(event) {
    this.setState({ auto_tweet: this.state.auto_tweet, route_filter: event.target.value });
  },
  saveSettings: function(event) {
    event.preventDefault();
    var component = this;
    ajax.put('/api/users', {
      auto_tweet: this.state.auto_tweet,
      route_filter: this.state.route_filter
    }).then(function() {
      var user = statemachine.getState().user;

      user.auto_tweet = destupidify(component.state.auto_tweet);
      user.route_filter = component.state.route_filter;
      statemachine.updateState('user', user);
      component.goDashboard();
    });
  },
  goDashboard: function(event) {
    if (event) event.preventDefault();
    window.location.assign('/#');
  },
  render: function() {
    return (
      <div className="settings">
        <form>
          <label htmlFor="auto-tweet">Twitter Settings (When I check-in to a bar)</label>
          <select className="form-control" id="auto-tweet" value={this.state.auto_tweet} onChange={this.changeTweetSettings}>
            <option value="true">Always Tweet</option>
            <option value="false">Never Tweet</option>
            <option value="null">Ask Every Time</option>
          </select>
          <label htmlFor="route-filter">Filter My Routes</label>
          <select className="form-control" id="route-filter" value={this.state.route_filter} onChange={this.changeFilterSettings}>
            <option value="all">Everything</option>
            <option value="recent">Pending and Ten Recent</option>
            <option value="pending">Only Pending</option>
          </select>
          <button className="btn btn-primary" type="submit" onClick={this.saveSettings}>Save</button>
          <button className="btn btn-primary" type="submit" onClick={this.goDashboard}>Cancel</button>
        </form>
      </div>
    );
  }
});

module.exports = {
  Settings: Settings
};

var destupidify = function(input) {
  var destupidified = stupid.destupidifyAffirmativeVal(input) || stupid.destupidifyNegativeVal(input);
  return destupidified === undefined ? null : destupidified;
}
