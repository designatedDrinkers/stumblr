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
    });
  },
  checkIn: function(i) {
    currentBar = i;
    var component = this;
    var route_index = this.props.params.index;
    ajax.put('/api/barroutes/' + this.props.params.index, { bar_id: i, check_in: true })
    .then(function(result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(statemachine.updateState('currentRoute', component.state.currentRoute));
      console.log('here', component.state.user.auto_tweet);
      if(component.state.user.auto_tweet === null){
        console.log('here as well');
          // component.showModal = true;
          component.setState(statemachine.updateState('showModal', true));
      }else{
        tweet(i, route_index, component.state.user.auto_tweet);
      }
    });
  },
  render: function() {
    var lis = composeList(this, this.state.currentRoute);
    var modal = this.state.user.auto_tweet === null ? <TweetModal /> : '';
    if (lis.length) {
      return (
        <div className="route-details">
          <ul className="bar-list">
            <li key="-1">Route Details:</li>
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
  getInitialState: function() {
  return statemachine.getState();
  },
  hideModal: function() {
    this.setState(statemachine.updateState('showModal', false));
  },
  tweetAndHide: function(){
    tweet(currentBar, currentRoute, true);
    this.setState(statemachine.updateState('showModal', false));
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
              Would you like to tweet your check in?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.tweetAndHide}>Yes</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.hideModal}>No</button>
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
        <li key={i} className="bar-status">
          <p>{bar.name}</p>
          <p><span>Status: </span><span>{status}</span></p>
        </li>
      );
    } else {
      var checkIn = component.checkIn.bind(component, i);
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

function tweet(bar_index, route_index, autoTweet){
  console.log(autoTweet);
  if(autoTweet){
    ajax.post('/api/twitter/checkin', {bar_index: bar_index, route_index: route_index}).then(function(data){
      console.log(data);
    })
  }
}
