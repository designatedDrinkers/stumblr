'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _header = require('../header');

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _ajaxPromise = require('ajax-promise');

var _ajaxPromise2 = _interopRequireDefault(_ajaxPromise);

var _barrouteData = require('../barroute-data');

var _barrouteData2 = _interopRequireDefault(_barrouteData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouteDetails = _react2.default.createClass({
  displayName: 'RouteDetails',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  componentDidMount: function componentDidMount() {
    _statemachine2.default.setMenu('def');
    _reactDom2.default.render(_react2.default.createElement(_header.Header, null), document.getElementById('header'));
    var component = this;
    _ajaxPromise2.default.get('/api/barroutes/' + this.props.params.index).then(function (result) {
      component.setState(_statemachine2.default.updateState('currentRoute', result.route));
      _barrouteData2.default.recreate(result.route.route);
    });
  },

  render: function render() {
    var lis = composeList(this, this.state.currentRoute);
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        null,
        'Route Details'
      ),
      _react2.default.createElement(
        'ul',
        null,
        lis
      )
    );
  }
});

module.exports = {
  RouteDetails: RouteDetails
};

function composeList(component, route) {
  if (!route) return [];
  var lis = route.bars.map(function (bar) {
    if (bar.checked_in || bar.skipped) {
      var status = bar.checked_in ? 'Checked In' : 'Skipped';
    }
    if (status) {
      return _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'p',
          null,
          'Bar: ',
          bar.name
        ),
        _react2.default.createElement(
          'p',
          null,
          'Status: ',
          status
        )
      );
    } else {
      return _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          'p',
          null,
          'Bar: ',
          bar.name
        ),
        _react2.default.createElement(
          'p',
          null,
          'Status: Pending'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: component.checkIn },
          'Check In'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: component.skip },
          'Skip'
        )
      );
    }
  });
  return lis;
}