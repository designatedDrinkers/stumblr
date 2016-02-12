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
      return(
        // <header className="contain-to-grid sticky">
        _react2.default.createElement(
          'div',
          { className: 'top-bar' },
          _react2.default.createElement(
            'div',
            { className: 'top-bar-left' },
            _react2.default.createElement(
              'ul',
              { className: 'dropdown menu', 'data-dropdown-menu': true },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement('img', { className: 'logo', src: 'images/stumblr-logo.png' })
              ),
              _react2.default.createElement(
                'li',
                { className: 'menu-text' },
                'Stumblr'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'top-bar-right' },
            _react2.default.createElement(
              'ul',
              { className: 'dropdown menu', 'data-dropdown-menu': true },
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement('a', { href: '#', className: 'menu-icon' }),
                _react2.default.createElement(
                  'ul',
                  { className: 'menu vertical' },
                  _react2.default.createElement(Menu, null)
                )
              )
            )
          )
        )
        // </header>

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
      { className: 'menu', 'data-responsive-menu': 'drilldown medium-dropdown' },
      lis
    );
  }
});

module.exports = {
  Header: Header
};