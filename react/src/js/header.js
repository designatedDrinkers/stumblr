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
          { className: 'navbar' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            _react2.default.createElement(
              'div',
              { className: 'navbar-header' },
              _react2.default.createElement(
                'a',
                { className: 'navbar-brand', href: '/' },
                _react2.default.createElement('img', { className: 'pull-left', src: 'images/stumblr-logo.png' }),
                _react2.default.createElement(
                  'span',
                  { className: 'pull-left' },
                  'Stumblr'
                )
              ),
              _react2.default.createElement(
                'ul',
                { className: 'hamburger nav navbar-nav navbar-right' },
                _react2.default.createElement(
                  'li',
                  { role: 'presentation', className: 'dropdown' },
                  _react2.default.createElement(
                    'a',
                    { className: 'dropdown-toggle', 'data-toggle': 'dropdown', href: '#', role: 'button' },
                    _react2.default.createElement('span', { className: 'glyphicon glyphicon-menu-hamburger' })
                  ),
                  _react2.default.createElement(Menu, null)
                )
              )
            )
          )
        )
      );
    } else {
      return _react2.default.createElement(
        'header',
        null,
        _react2.default.createElement(
          'nav',
          { className: 'navbar' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            _react2.default.createElement(
              'div',
              { className: 'navbar-header' },
              _react2.default.createElement(
                'a',
                { className: 'navbar-brand', href: '/' },
                _react2.default.createElement('img', { className: 'pull-left', src: 'images/stumblr-logo.png' }),
                _react2.default.createElement(
                  'span',
                  { className: 'pull-left' },
                  'Stumblr'
                )
              )
            )
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