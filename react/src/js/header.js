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
        null,
        _react2.default.createElement(
          'nav',
          { 'class': 'navbar navbar-default' },
          _react2.default.createElement(
            'div',
            { 'class': 'container-fluid' },
            _react2.default.createElement(
              'div',
              { 'class': 'navbar-header' },
              _react2.default.createElement('button', { type: 'button', 'class': 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#bs-example-navbar-collapse-1' }),
              _react2.default.createElement('img', { className: 'logo', src: 'images/stumblr-logo.png' }),
              _react2.default.createElement(
                'a',
                { 'class': 'navbar-brand', href: '#' },
                'Stumblr'
              ),
              _react2.default.createElement(
                'ul',
                { 'class': 'nav navbar-nav navbar-right' },
                _react2.default.createElement(
                  'li',
                  { 'class': 'dropdown' },
                  _react2.default.createElement(
                    'a',
                    { href: '#', 'class': 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button' },
                    'Dropdown ',
                    _react2.default.createElement('span', { 'class': 'caret' })
                  )
                )
              )
            )
          )
        )
      );
    } else {
      return _react2.default.createElement(
        'nav',
        null,
        _react2.default.createElement(
          'div',
          { className: 'title-area left' },
          _react2.default.createElement('img', { className: 'logo', src: 'images/stumblr-logo.png' }),
          _react2.default.createElement(
            'span',
            null,
            'Stumblr'
          )
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
      { className: 'dropdown-menu' },
      lis
    );
  }
});

module.exports = {
  Header: Header
};