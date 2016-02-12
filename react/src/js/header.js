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
          { className: 'navbar navbar-default' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            _react2.default.createElement(
              'div',
              { className: 'navbar-header' },
              _react2.default.createElement('button', { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#bs-example-navbar-collapse-1' }),
              _react2.default.createElement('img', { className: 'logo', src: 'images/stumblr-logo.png' }),
              _react2.default.createElement(
                'a',
                { className: 'navbar-brand', href: '#' },
                'Stumblr'
              ),
              _react2.default.createElement(
                'ul',
                { className: 'nav navbar-nav navbar-right' },
                _react2.default.createElement(
                  'li',
                  { className: 'dropdown' },
                  _react2.default.createElement(
                    'a',
                    { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button' },
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