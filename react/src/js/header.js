'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statemachine = require('./statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _ajaxPromise = require('ajax-promise');

var _ajaxPromise2 = _interopRequireDefault(_ajaxPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _react2.default.createClass({
  displayName: 'Header',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  render: function render() {
    if (this.state.user) {
      return _react2.default.createElement(
        'header',
        { id: 'header', className: 'top-bar-left', 'data-responsive-toggle': true, 'data-hide-for': 'medium' },
        _react2.default.createElement(
          'div',
          { className: 'title-bar-title' },
          'Stumblr'
        ),
        _react2.default.createElement(
          'button',
          { className: 'menu-icon', type: 'button', 'data-toggle': true },
          _react2.default.createElement(Menu, null)
        )
      );
    } else {
      return _react2.default.createElement(
        'header',
        { id: 'header', className: 'top-bar-left', 'data-responsive-toggle': true, 'data-hide-for': 'medium' },
        _react2.default.createElement(
          'div',
          { className: 'title-bar-title' },
          'Stumblr'
        )
      );
    }
  }
});

var Menu = _react2.default.createClass({
  displayName: 'Menu',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  componentDidMount: function componentDidMount() {
    // generate menu...
    var menu = [{
      link: '#/settings', text: 'Settings'
    }, {
      link: '/auth/logout', text: 'Log Out'
    }];
    this.setState(_statemachine2.default.updateState('menu', menu));
  },
  render: function render() {
    var component = this;
    var lis = this.state.menu.map(function (item, i) {
      return _react2.default.createElement(
        'li',
        { key: i },
        _react2.default.createElement(
          'a',
          { href: item.link },
          item.text
        )
      );
    });
    return _react2.default.createElement(
      'ul',
      { className: 'menu', 'data-responsive-menu': 'drilldown medium-dropdown' },
      lis
    );
  }
});

module.exports = {
  Header: Header
};