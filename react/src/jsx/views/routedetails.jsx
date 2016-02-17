import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../header';
import statemachine from '../statemachine';
import ajax from 'ajax-promise';
import routeData from '../barroute-data';
import tweetModal from './tweetmodal';

var RouteDetails = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  componentDidMount: function() {
    statemachine.setMenu('def');
    ReactDOM.render(<Header />, document.getElementById('header'));
    var component = this;
    statemachine.updateState('currentRouteIndex', this.props.params.index);
    ajax.get('/api/barroutes/' + this.props.params.index).then(function(result) {
      component.setState(statemachine.updateState('currentRoute', result.route));
      routeData.recreate(result.route);
    });
  },
  skip: function(i) {
    statemachine.updateState('currentBarIndex', i);
    var component = this;
    ajax.put('/api/barroutes/' + this.props.params.index, { bar_id: i, skip: true })
    .then(function(result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(statemachine.updateState('currentRoute', component.state.currentRoute));
      if(isRouteComplete()){
        var newBadges = result.newBadges || [];
        component.setState(statemachine.updateState('newBadges', newBadges));
      }
      tweetModal.tweet(null, component.props.params.index, null, null, isRouteComplete);
    });
  },
  checkIn: function(i, message) {
    statemachine.updateState('currentBarIndex', i);
    var component = this;
    var route_index = this.props.params.index;
    ajax.put('/api/barroutes/' + this.props.params.index, { bar_id: i, check_in: true })
    .then(function(result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(statemachine.updateState('currentRoute', component.state.currentRoute));
      document.getElementById('tweet-message-box').value = message;
      if(isRouteComplete()){
        var newBadges = result.newBadges || [];
        component.setState(statemachine.updateState('newBadges', newBadges));
      }
      if(component.state.user.auto_tweet !== null) {
        tweetModal.tweet(i, route_index, component.state.user.auto_tweet, message, isRouteComplete);
      }
    });
  },
  forfeit: function(i){
    var component = this;
    ajax.put('/api/barroutes/' + this.props.params.index, {forfeit: true})
    .then(function(response){
      var newBadges = response.newBadges || [];
      component.setState(statemachine.updateState('newBadges', newBadges));
      window.location.assign('#/routes/' + component.props.params.index + '/done');
    });
  },
  complete: isRouteComplete,
  render: function() {
    var lis = composeList(this, this.state.currentRoute);
    var modal = this.state.user.auto_tweet === null ? <tweetModal.TweetModal isRouteComplete={isRouteComplete}/> : '';
    var showFButton = this.complete();
    if (lis.length) {
      return (
        <div className="route-details">
          <ul className="bar-list">
            <li key="-1">Route Details: &quot;{this.state.currentRoute.name || '(No Name)'}&quot;</li>
            {lis}
          </ul>
          {modal}
          {!showFButton ? (<button className="btn btn-warning" onClick={this.forfeit}>Forfeit</button>) : null}
        </div>
      );
    } else {
      return (
        <div className="route-details loading">
          <i className="fa fa-beer fa-spin"></i>
        </div>
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
        <li key={i} className="bar-status">
          <p>{bar.name}: {bar.vicinity}</p>
          <p><span>Status: </span><span>{status}</span></p>
        </li>
      );
    } else {
      var checkIn = component.checkIn.bind(component, i, tweetModal.defaultCheckIn(bar.name));
      var skip = component.skip.bind(component, i);
      return (
        <li key={i} className="bar-status">
          <p>{bar.name}</p>
          <p><span>Status: </span><span>Pending</span></p>
          <button className="btn btn-primary" onClick={checkIn} data-toggle="modal" data-target="#tweet-modal">Check In</button>
          <button className="btn btn-primary" onClick={skip}>Skip</button>
        </li>
      );
    }
  });
  return lis;
}

function isRouteComplete() {
  var route = statemachine.getState().currentRoute || { bars: [{}] };
  return route.bars.filter(function(bar){
    return bar.checked_in || bar.skipped;
  }).length == route.bars.length;
}
