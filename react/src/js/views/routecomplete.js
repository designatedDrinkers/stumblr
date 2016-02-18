'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _header = require('../header');

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _ajaxPromise = require('ajax-promise');

var _ajaxPromise2 = _interopRequireDefault(_ajaxPromise);

var _methods = require('../methods');

var _methods2 = _interopRequireDefault(_methods);

var _tweetmodal = require('./tweetmodal');

var _tweetmodal2 = _interopRequireDefault(_tweetmodal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Badges = _react2.default.createClass({
  displayName: 'Badges',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  tweetBadge: function tweetBadge(message) {
    var component = this;
    document.getElementById('tweet-message-box').value = message;
    var user = _statemachine2.default.getState().user;
    // tweetModal.tweet(null, null, true, message, isRouteComplete);
  },
  render: function render() {
    var component = this;
    var modal = _react2.default.createElement(_tweetmodal2.default.TweetModal, { isRouteComplete: isRouteComplete });
    var tweetBadgeBtnTxt = component.state.newBadges.length > 1 ? 'Tweet these badges!' : 'Tweet this badge!';
    var clickHandler = this.tweetBadge.bind(this, _tweetmodal2.default.defaultRouteComplete(this.state.newBadges));
    return _react2.default.createElement(
      'div',
      { className: 'completeView' },
      _react2.default.createElement(
        'div',
        { className: 'completeBadgeContainer' },
        this.state.newBadges.map(function (badge, i) {
          return _react2.default.createElement(
            'div',
            { key: i },
            _react2.default.createElement(
              'figure',
              { className: 'completeBadge' },
              _react2.default.createElement('img', { src: badge.image, alt: badge.name }),
              _react2.default.createElement(
                'figcaption',
                null,
                _react2.default.createElement(
                  'p',
                  null,
                  badge.name
                ),
                _react2.default.createElement(
                  'p',
                  { className: 'badge-description' },
                  badge.description
                )
              )
            )
          );
        })
      ),
      _react2.default.createElement(
        'button',
        { className: 'btn btn-info btn-badge-tweet', onClick: clickHandler, 'data-toggle': 'modal', 'data-target': '#tweet-modal' },
        tweetBadgeBtnTxt
      ),
      modal
    );
  }
});

var RouteComplete = _react2.default.createClass({
  displayName: 'RouteComplete',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  componentDidMount: function componentDidMount() {
    _statemachine2.default.setMenu('def');
    _reactDom2.default.render(_react2.default.createElement(_header.Header, null), document.getElementById('header'));
    _methods2.default.hideMap();
    var component = this;
    _ajaxPromise2.default.get('/api/barroutes/' + this.props.params.index).then(function (result) {
      component.setState(_statemachine2.default.updateState('currentRoute', result.route));
    });
  },
  render: function render() {
    var status = isRouteComplete((this.state.currentRoute || { bars: [] }).bars);
    var badgeMessage,
        newBadges = this.state.newBadges || [];
    switch (newBadges.length) {
      case 0:
        badgeMessage = 'You earned no badges.';
        break;
      case 1:
        badgeMessage = 'You earned a new badge.';
        break;
      default:
        badgeMessage = 'You earned ' + newBadges.length + ' badges.';
    }
    if (status) {
      return _react2.default.createElement(
        'div',
        { className: 'done-container' },
        _react2.default.createElement(
          'h1',
          { className: 'win' },
          'Route Complete!'
        ),
        _react2.default.createElement(
          'h3',
          null,
          badgeMessage
        ),
        newBadges.length > 0 ? _react2.default.createElement(Badges, null) : null
      );
    } else {
      return _react2.default.createElement(
        'div',
        { className: 'done-container' },
        _react2.default.createElement(
          'h1',
          { className: 'fail' },
          'Route Forfeited.'
        ),
        _react2.default.createElement(
          'h3',
          null,
          badgeMessage
        ),
        newBadges.length > 0 ? _react2.default.createElement(Badges, null) : null
      );
    }
  }
});

function isRouteComplete(barArray) {
  barArray = barArray || [{}];
  return barArray.filter(function (bar) {
    return bar.checked_in;
  }).length == barArray.length;
};

module.exports = {
  RouteComplete: RouteComplete
};