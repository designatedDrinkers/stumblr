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
          'a',
          { href: '/auth/twitter' },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-primary', className: 'btn btn-primary btn-lg' },
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
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'dash' },
      _react2.default.createElement('img', { className: 'profile-image', src: this.state.user.twitter_image }),
      _react2.default.createElement(
        'p',
        null,
        this.state.user.twitter_name
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