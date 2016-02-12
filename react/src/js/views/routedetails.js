'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _header = require('../header');

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouteDetails = _react2.default.createClass({
  displayName: 'RouteDetails',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  componentDidMount: function componentDidMount() {
    _statemachine2.default.setMenu('def');
    _reactDom2.default.render(_react2.default.createElement(_header.Header, null), document.getElementById('header'));
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', { id: 'map' }),
      _react2.default.createElement(
        'p',
        null,
        'Route Details'
      ),
      _react2.default.createElement('div', { id: 'list' })
    );
  }
});