'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _ajaxPromise = require('ajax-promise');

var _ajaxPromise2 = _interopRequireDefault(_ajaxPromise);

var _header = require('../header');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Settings = _react2.default.createClass({
  displayName: 'Settings',

  getInitialState: function getInitialState() {
    var user = _statemachine2.default.getState().user;
    return { auto_tweet: user.auto_tweet };
  },
  componentDidMount: function componentDidMount() {
    _statemachine2.default.setMenu('def');
    _reactDom2.default.render(_react2.default.createElement(_header.Header, null), document.getElementById('header'));
  },
  changeTweetSettings: function changeTweetSettings(event) {
    this.setState({ auto_tweet: event.target.value });
  },
  saveSettings: function saveSettings(event) {
    event.preventDefault();
    var component = this;
    _ajaxPromise2.default.put('/api/users', { auto_tweet: this.state.auto_tweet }).then(function () {
      var user = _statemachine2.default.getState().user;
      user.auto_tweet = component.state.auto_tweet;
      _statemachine2.default.updateState('user', user);
      component.goDashboard();
    });
  },
  goDashboard: function goDashboard(event) {
    if (event) event.preventDefault();
    window.location.assign('/#');
  },
  render: function render() {
    return _react2.default.createElement(
      'form',
      null,
      _react2.default.createElement(
        'label',
        { htmlFor: 'auto-tweet' },
        'Twitter Settings (When I check-in to a bar)'
      ),
      _react2.default.createElement(
        'select',
        { id: 'auto-tweet', value: this.state.auto_tweet, onChange: this.changeTweetSettings },
        _react2.default.createElement(
          'option',
          { value: 'true' },
          'Always Tweet'
        ),
        _react2.default.createElement(
          'option',
          { value: 'false' },
          'Never Tweet'
        ),
        _react2.default.createElement(
          'option',
          { value: 'null' },
          'Ask Every Time'
        )
      ),
      _react2.default.createElement(
        'button',
        { className: 'btn btn-primary', type: 'submit', onClick: this.saveSettings },
        'Save'
      ),
      _react2.default.createElement(
        'button',
        { className: 'btn btn-primary', type: 'submit', onClick: this.goDashboard },
        'Cancel'
      )
    );
  }
});

module.exports = {
  Settings: Settings
};