'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statemachine = require('./statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = _react2.default.createClass({
  displayName: 'Header',

  getInitialState: function getInitialState() {
    return _statemachine2.default.reducer({ user: this.props.user }, {});
  },
  render: function render() {
    console.log(this.state);
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
          _react2.default.createElement(Menu, { user: this.props.user })
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
    return _statemachine2.default.reducer({
      user: this.props.user
    }, {
      type: 'SET_MENU_ITEMS',
      menu: [{
        link: '#/something',
        text: 'Go To This Thing'
      }, {
        link: '#/something-else',
        text: 'Go To That Thing'
      }]
    });
  },
  render: function render() {
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
      { 'class': 'menu', 'data-responsive-menu': 'drilldown medium-dropdown' },
      lis
    );
  }
});

module.exports = {
  Header: Header,
  Menu: Menu
};