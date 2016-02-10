'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Login = _react2.default.createClass({
  displayName: 'Login',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  render: function render() {
    return _react2.default.createElement(
      'a',
      { href: '/auth/twitter' },
      _react2.default.createElement(
        'button',
        { className: 'button' },
        'Login with Twitter'
      )
    );
  }
});

var Dashboard = _react2.default.createClass({
  displayName: 'Dashboard',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  render: function render() {
    return _react2.default.createElement(
      'p',
      null,
      'You are logged in'
    );
  }
});

var SplashDash = _react2.default.createClass({
  displayName: 'SplashDash',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
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