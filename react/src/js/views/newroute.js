'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewRoute = _react2.default.createClass({
  displayName: 'NewRoute',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', { id: 'map' }),
      _react2.default.createElement(
        'p',
        null,
        'New Route'
      ),
      _react2.default.createElement('div', { id: 'list' })
    );
  }
});

module.exports = {
  NewRoute: NewRoute
};