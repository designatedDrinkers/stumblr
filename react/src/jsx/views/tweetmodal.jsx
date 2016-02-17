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

function defaultCheckIn(barName) {
  return "I just checked in at " + barName + " on @stumblr_app #stumblr";
}

function defaultRouteComplete(badgeName) {
  return "I just earned the " + badgeName + " badge on @stumblr_app #stumblr";
}

module.exports = {TweetModal: TweetModal, tweet: tweet, defaultCheckIn: defaultCheckIn, defaultRouteComplete: defaultRouteComplete};
