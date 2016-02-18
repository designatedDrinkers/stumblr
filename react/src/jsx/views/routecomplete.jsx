import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../header';
import statemachine from '../statemachine';
import ajax from 'ajax-promise';
import methods from '../methods';
import tweetModal from './tweetmodal';

var Badges = React.createClass({
  getInitialState: function(){
    return statemachine.getState();
  },
  tweetBadge: function(){
    var component = this;
    // var badge = this.state.newBadges[0];
    tweetModal.tweet(null, null, true, tweetModal.defaultRouteComplete(this.state.newBadges));
    window.location.assign('/');
  },
  render: function(){
    var component = this;
    return (
      <div>
        <div className="completeBadgeContainer">
        {this.state.newBadges.map(function(badge, i){
          return (
            <div key={i}>
              <figure className="completeBadge">
              <img src={badge.image} alt={badge.name} />
              <figcaption>
                <p>{badge.name}</p>
                <p>{badge.description}</p>
              </figcaption>
              </figure>
            </div>
            )
          })}
        </div>
        <button className="btn btn-info" onClick={this.tweetBadge}>Tweet this badge!</button>
      </div>
  )
  }
});

var RouteComplete = React.createClass({
  getInitialState: function(){
    return statemachine.getState();
  },
  componentDidMount: function() {
    statemachine.setMenu('def');
    ReactDOM.render(<Header />, document.getElementById('header'));
    methods.hideMap();
    var component = this;
    ajax.get('/api/barroutes/' + this.props.params.index).then(function(result) {
      component.setState(statemachine.updateState('currentRoute', result.route));
    });
  },
  render: function() {
    var status = isRouteComplete((this.state.currentRoute || {}).bars);
    var badgeMessage;
    switch(this.state.newBadges.length) {
      case 0:
        badgeMessage = 'You earned no badges.';
        break;
      case 1:
        badgeMessage = 'You earned a new badge.';
        break;
      default:
        badgeMessage = 'You earned ' + this.state.newBadges.length + ' badges.'
    }
    if (status){
      return (
        <div className="done-container">
          <h1 className="win">Route Complete!</h1>
          <h3>{badgeMessage}</h3>
          { this.state.newBadges.length > 0? <Badges /> : null }
        </div>
      );
    } else {
      return (
        <div className="done-container">
          <h1 className="fail">Route Forfeited.</h1>
          <h3>{badgeMessage}</h3>
          {this.state.newBadges.length > 0? <Badges /> : null}
        </div>
      );
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
