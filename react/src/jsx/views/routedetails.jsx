import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from '../header';
import statemachine from '../statemachine';
import ajax from 'ajax-promise';
import routeData from '../barroute-data';

var currentBar;
var currentRoute;

var RouteDetails = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  componentDidMount: function() {
    statemachine.setMenu('def');
    ReactDOM.render(<Header />, document.getElementById('header'));
    var component = this;
    currentRoute = this.props.params.index;
    ajax.get('/api/barroutes/' + this.props.params.index).then(function(result) {
      component.setState(statemachine.updateState('currentRoute', result.route));
      routeData.recreate(result.route);
    });
  },
  skip: function(i) {
    currentBar = i;
    var component = this;
    ajax.put('/api/barroutes/' + this.props.params.index, { bar_id: i, skip: true })
    .then(function(result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(statemachine.updateState('currentRoute', component.state.currentRoute));
      if(isRouteComplete){
        var newBadges = result.newBadges || [];
        component.setState(statemachine.updateState('newBadges', newBadges));
      }
      tweet(null, component.props.params.index);
    });
  },
  checkIn: function(i, message) {
    currentBar = i;
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
        tweet(i, route_index, component.state.user.auto_tweet, message);
      }
    });
  },
  forfeit: function(i){
    var component = this;
    var bars = currentRoute.bars;
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
    var modal = this.state.user.auto_tweet === null ? <TweetModal /> : '';
    var showFButton = this.complete();
    if (lis.length) {
      return (
        <div className="route-details">
          {!showFButton ? (<div className="forfeit-container"><button className="btn btn-danger forfeit-btn" onClick={this.forfeit}>Forfeit</button></div>) : null}
          <ul className="bar-list">
            <li key="-1">Route Details: &quot;{this.state.currentRoute.name || '(No Name)'}&quot;</li>
            {lis}
          </ul>
          {modal}
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

var TweetModal = React.createClass({
  hideModal: function() {
    tweet(currentBar, currentRoute, false);
  },
  tweetAndHide: function(){
    var message = document.getElementById('tweet-message-box').value;
    tweet(currentBar, currentRoute, !!message, message);
  },
  render: function(){
    return(
      <div className="modal fade" id="tweet-modal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Tweet!</h4>
            </div>
            <div className="modal-body">
              <p>Tweet your status update:</p>
              <textarea id="tweet-message-box" maxlength="140"></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-info" data-dismiss="modal" onClick={this.tweetAndHide}>Yes</button>
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.hideModal}>No</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
})

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
        <li key={i} className="bar-status well">
          <p>{bar.name}: {bar.vicinity}</p>
          <p><span>Status: </span><span>{status}</span></p>
        </li>
      );
    } else {
      var checkIn = component.checkIn.bind(component, i, defaultTweet(bar.name));
      var skip = component.skip.bind(component, i);
      return (
        <li key={i} className="bar-status well">
          <p>{bar.name}: {bar.vicinity}</p>
          <p><span>Status: </span><span>Pending</span></p>
          <button className="btn btn-primary" onClick={checkIn} data-toggle="modal" data-target="#tweet-modal">Check In</button>
          <button className="btn btn-primary" onClick={skip}>Skip</button>
        </li>
      );
    }
  });
  return lis;
}

function tweet(bar_index, route_index, autoTweet, message){
  if(autoTweet){
    ajax.post('/api/twitter/checkin', {bar_index: bar_index, route_index: route_index, message: message})
    .then(function(data){
      if (isRouteComplete()) {
        window.location.assign('#/routes/' + route_index + '/done');
      }
    });
  } else {
    if (isRouteComplete()) {
      window.location.assign('#/routes/' + route_index + '/done');
    }
  }
}

function isRouteComplete() {
  var route = statemachine.getState().currentRoute || { bars: [{}] };
  return route.bars.filter(function(bar){
    return bar.checked_in || bar.skipped;
  }).length == route.bars.length;
}

function defaultTweet(barName) {
  return "I just checked in at " + barName + " on @stumblr_app #stumblr";
}
