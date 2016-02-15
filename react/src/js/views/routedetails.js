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
      _barrouteData2.default.recreate(result.route);
    });
  },
  skip: function skip(i) {
    var component = this;
    _ajaxPromise2.default.put('/api/barroutes/' + this.props.params.index, { bar_id: i, skip: true }).then(function (result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(_statemachine2.default.updateState('currentRoute', component.state.currentRoute));
    });
  },
  checkIn: function checkIn(i) {
    var component = this;
    _ajaxPromise2.default.put('/api/barroutes/' + this.props.params.index, { bar_id: i, check_in: true }).then(function (result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(_statemachine2.default.updateState('currentRoute', component.state.currentRoute));
    });
  },
  render: function render() {
    var lis = composeList(this, this.state.currentRoute);
    if (lis) {
      return _react2.default.createElement(
        'div',
        { className: 'route-details' },
        _react2.default.createElement(
          'ul',
          { className: 'bar-list' },
          _react2.default.createElement(
            'li',
            { key: '-1' },
            'Route Details:'
          ),
          lis
        )
      );
    } else {
      return _react2.default.createElement(
        'div',
        { className: 'new-route' },
        _react2.default.createElement('i', { className: 'fa fa-spinner fa-spin' })
      );
    }
  }
});

module.exports = {
  RouteDetails: RouteDetails
};

function composeList(component, route) {
  if (!route) return [];
  var lis = route.bars.map(function (bar, i) {
    if (bar.checked_in || bar.skipped) {
      var status = bar.checked_in ? 'Checked In' : 'Skipped';
    }
    if (status) {
      return _react2.default.createElement(
        'li',
        { key: i, className: 'bar-status' },
        _react2.default.createElement(
          'p',
          null,
          bar.name
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            null,
            'Status: '
          ),
          _react2.default.createElement(
            'span',
            null,
            status
          )
        )
      );
    } else {
      var checkIn = component.checkIn.bind(component, i);
      var skip = component.skip.bind(component, i);
      return _react2.default.createElement(
        'li',
        { key: i, className: 'bar-status' },
        _react2.default.createElement(
          'p',
          null,
          bar.name
        ),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            null,
            'Status: '
          ),
          _react2.default.createElement(
            'span',
            null,
            'Pending'
          )
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: checkIn },
          'Check In'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: skip },
          'Skip'
        )
      );
    }
  });
  return lis;
}