'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _react2.default.createClass({
  displayName: 'Header',

  render: function render() {
    return _react2.default.createElement(
      'p',
      null,
      'Hello'
    );
  }
});

_reactDom2.default.render(_react2.default.createElement(Header, null), (0, _jquery2.default)('#header')[0]);