import React from 'react';
import ReactDOM from 'react-dom';
import statemachine from '../statemachine';
import ajax from 'ajax-promise';

var TweetModal = React.createClass({
  hideModal: function() {
    var currentBar = statemachine.getState().currentBarIndex;
    var currentRoute = statemachine.getState().currentRouteIndex;
    tweet(currentBar, currentRoute, false, null, this.props.isRouteComplete);
  },
  tweetAndHide: function(){
    var message = document.getElementById('tweet-message-box').value;
    var currentBar = statemachine.getState().currentBarIndex;
    var currentRoute = statemachine.getState().currentRouteIndex;
    tweet(currentBar, currentRoute, !!message, message, this.props.isRouteComplete);
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
              <textarea id="tweet-message-box" maxLength="140"></textarea>
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

function tweet(bar_index, route_index, autoTweet, message, isRouteComplete){
  if(autoTweet){
    ajax.post('/api/twitter/checkin', {bar_index: bar_index, route_index: route_index, message: message})
    .then(function(data){
      if (isRouteComplete && isRouteComplete()) {
        window.location.assign('#/routes/' + route_index + '/done');
      }
    });
  } else {
    if (isRouteComplete && isRouteComplete()) {
      window.location.assign('#/routes/' + route_index + '/done');
    }
  }
}

var lastCheckin = 0;
function defaultCheckIn(barName) {
  var responses = [
    "I just checked in at " + barName + " on @stumblr_app #stumblr",
    "Getting crunk at " + barName + "! #stumblr",
    "Help me finish my @stumblr_app bar hopping plan! #stumblr",
    "Join me at " + barName + " and we'll get #stumblr -y.",
    "Drinkers got to drink! Stumbled in to " + barName + " with @stumblr_app."
  ];
  if (lastCheckin == responses.length) lastCheckin = 0;
  return responses[lastCheckin++];
}

var lastComplete = 0;
function defaultRouteComplete(badges) {
  var badgeList = pluralize(badges.map(function(badge) { return badge.name; }));
  var responses = [
    "I just earned " + badgeList + " with @stumblr_app #stumblr",
    "Thanks, @stumblr_app for helping me drink my way to " + badgeList,
    "Proud of my lastest @stumblr_app acheivement: " + badgeList,
    "I leveled up my drinking stat! #stumblr",
    "Had a Blast with @stumblr_app! Hurray for http://www.stumblr.club"
  ];
  if (lastComplete == responses.length) lastComplete = 0;
  return responses[lastComplete++];
}

module.exports = {TweetModal: TweetModal, tweet: tweet, defaultCheckIn: defaultCheckIn, defaultRouteComplete: defaultRouteComplete};

function pluralize(array) {
  if (array.length <= 1) return array[0] || '';
  if (array.length == 2) return array.join(' and ');
  else {
    var last = array.pop();
    var end = array.length - 1;
    array[end] += ', and ' + last;
    return array.join(', ');
  }
}
