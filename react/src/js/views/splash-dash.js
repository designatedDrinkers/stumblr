'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _newroute = require('./newroute');

var _routeListComponent = require('./route-list-component');

var _header = require('../header');

var _methods = require('../methods');

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = _react2.default.createClass({
  displayName: 'Login',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  render: function render() {
    return _react2.default.createElement(
      'main',
      null,
      _react2.default.createElement(
        'div',
        { className: 'splash' },
        _react2.default.createElement('img', { className: 'splash-map', src: 'images/map.jpg' }),
        _react2.default.createElement(
          'h1',
          null,
          'Stumblr'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Map the optimal pub crawl',
          _react2.default.createElement('br', null),
          ' before it\'s too late.'
        ),
        _react2.default.createElement(
          'a',
          { href: '/auth/twitter' },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-info btn-lg' },
            'Login with Twitter'
          )
        )
      )
    );
  }
});

var Dashboard = _react2.default.createClass({
  displayName: 'Dashboard',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  componentDidMount: function componentDidMount() {
    this.setState(_statemachine2.default.getState());
  },
  render: function render() {
    var badges = (this.state.user.badges || []).map(function (badge, i) {
      var style = {
        backgroundImage: 'url(' + badge.image + ')'
      };
      return _react2.default.createElement(
        'li',
        { className: 'badge', key: i },
        _react2.default.createElement(
          'div',
          { style: style, className: 'badge-count' },
          _react2.default.createElement(
            'span',
            { className: 'quantity' },
            badge.quantity
          )
        )
      );
    });
    return _react2.default.createElement(
      'div',
      { className: 'dash' },
      _react2.default.createElement(
        'div',
        { className: 'user-details' },
        _react2.default.createElement(
          'div',
          { className: 'twitter-info' },
          _react2.default.createElement('img', { className: 'profile-image', src: this.state.user.twitter_image }),
          _react2.default.createElement(
            'p',
            null,
            this.state.user.twitter_name
          )
        ),
        _react2.default.createElement(
          'ul',
          { className: 'badges' },
          badges
        )
      ),
      _react2.default.createElement(_newroute.RouteForm, null),
      _react2.default.createElement(_routeListComponent.RouteList, null)
    );
  }
});

var SplashDash = _react2.default.createClass({
  displayName: 'SplashDash',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  componentDidMount: function componentDidMount() {
    _methods2.default.hideMap();
    this.setState(_statemachine2.default.getState());
    if (this.state.user) {
      _statemachine2.default.setMenu('dash');
    } else {
      _statemachine2.default.setMenu('none');
    }
    _reactDom2.default.render(_react2.default.createElement(_header.Header, null), document.getElementById('header'));
  },
  render: function render() {
    if (this.state.user) {
      return _react2.default.createElement(Dashboard, null);
    } else {
      return _react2.default.createElement(Login, null);
    }
  }
});

module.exports = {
  SplashDash: SplashDash
};