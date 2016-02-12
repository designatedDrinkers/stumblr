import React from 'react';
import statemachine from '../statemachine';
import ajax from 'ajax-promise';

var Settings = React.createClass({
  getInitialState: function() {
    var user = statemachine.getState().user;
    return { auto_tweet: user.auto_tweet };
  },
  changeTweetSettings: function(event) {
    this.setState({ auto_tweet: event.target.value });
  },
  saveSettings: function(event) {
    event.preventDefault();
    var component = this;
    ajax.put('/api/users', { auto_tweet: this.state.auto_tweet }).then(function() {
      var user = statemachine.getState().user;
      user.auto_tweet = component.state.auto_tweet;
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
      <form>
        <label htmlFor="auto-tweet">Twitter Settings (When I check-in to a bar)</label>
        <select id="auto-tweet" value={this.state.auto_tweet} onChange={this.changeTweetSettings}>
          <option value="true">Always Tweet</option>
          <option value="false">Never Tweet</option>
          <option value="null">Ask Every Time</option>
        </select>
        <button className="btn btn-primary" type="submit" onClick={this.saveSettings}>Save</button>
        <button className="btn btn-primary" type="submit" onClick={this.goDashboard}>Cancel</button>
      </form>
    );
  }
});

module.exports = {
  Settings: Settings
};
