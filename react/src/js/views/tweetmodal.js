'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _ajaxPromise = require('ajax-promise');

var _ajaxPromise2 = _interopRequireDefault(_ajaxPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TweetModal = _react2.default.createClass({
  displayName: 'TweetModal',

  hideModal: function hideModal() {
    var currentBar = _statemachine2.default.getState().currentBarIndex;
    var currentRoute = _statemachine2.default.getState().currentRouteIndex;
    tweet(currentBar, currentRoute, false, null, this.props.isRouteComplete);
  },
  tweetAndHide: function tweetAndHide() {
    var message = document.getElementById('tweet-message-box').value;
    var currentBar = _statemachine2.default.getState().currentBarIndex;
    var currentRoute = _statemachine2.default.getState().currentRouteIndex;
    tweet(currentBar, currentRoute, !!message, message, this.props.isRouteComplete);
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'modal fade', id: 'tweet-modal', tabIndex: '-1' },
      _react2.default.createElement(
        'div',
        { className: 'modal-dialog' },
        _react2.default.createElement(
          'div',
          { className: 'modal-content' },
          _react2.default.createElement(
            'div',
            { className: 'modal-header' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'close', 'data-dismiss': 'modal' },
              _react2.default.createElement(
                'span',
                null,
                '×'
              )
            ),
            _react2.default.createElement(
              'h4',
              { className: 'modal-title', id: 'myModalLabel' },
              'Tweet!'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-body' },
            _react2.default.createElement(
              'p',
              null,
              'Tweet your status update:'
            ),
            _react2.default.createElement('textarea', { id: 'tweet-message-box', maxLength: '140' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-footer' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-info', 'data-dismiss': 'modal', onClick: this.tweetAndHide },
              'Yes'
            ),
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal', onClick: this.hideModal },
              'No'
            )
          )
        )
      )
    );
  }
});

function tweet(bar_index, route_index, autoTweet, message, isRouteComplete) {
  if (autoTweet) {
    _ajaxPromise2.default.post('/api/twitter/checkin', { bar_index: bar_index, route_index: route_index, message: message }).then(function (data) {
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

module.exports = { TweetModal: TweetModal, tweet: tweet, defaultCheckIn: defaultCheckIn, defaultRouteComplete: defaultRouteComplete };