'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _statemachine = require('./statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _header = require('./header');

var _main = require('./main');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _react2.default.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return _statemachine2.default.reducer(undefined, {});
  },
  componentDidMount: function componentDidMount() {
    _jquery2.default.get('/api/users/current-user').done(function (user) {
      if (Object.keys(user).length) {
        var newState = stateMachine(component.state, { type: 'SET_USER', user: user });
        component.setState(newState);
      }
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_header.Header, { user: this.state.user }),
      _react2.default.createElement('div', { id: 'map' }),
      _react2.default.createElement(_main.Main, { user: this.state.user }),
      _react2.default.createElement(
        'footer',
        { id: 'footer' },
        _react2.default.createElement(
          'p',
          null,
          'Please drink responsibly.'
        )
      )
    );
  }
});

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));