'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ajaxPromise = require('ajax-promise');

var _ajaxPromise2 = _interopRequireDefault(_ajaxPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouteList = _react2.default.createClass({
  displayName: 'RouteList',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  componentDidMount: function componentDidMount() {
    var component = this;
    _ajaxPromise2.default.get('/api/barroutes').then(function (routes) {
      component.setState(_statemachine2.default.updateState('routes', routes.barRoutes));
    });
  },
  render: function render() {
    var routes = this.state.routes;
    if (routes && routes.length) {
      return _react2.default.createElement(
        'ul',
        { className: 'route-list' },
        _react2.default.createElement(
          'li',
          { key: '-1' },
          _react2.default.createElement(
            'ul',
            { className: 'route' },
            _react2.default.createElement(
              'li',
              { key: -1 + 'date' },
              'Date'
            ),
            _react2.default.createElement(
              'li',
              { key: -1 + 'type' },
              'Type'
            ),
            _react2.default.createElement(
              'li',
              { key: -1 + 'status' },
              'Status'
            ),
            _react2.default.createElement('li', { key: -1 + 'link' })
          )
        ),
        routes.filter(filterRoutes(this.state.user.route_filter)).map(function (route, i) {
          var date = formatDate(route.date);
          var type = determineRouteType(route.bars);
          var status = determineRouteStatus(route.bars);
          return _react2.default.createElement(
            'li',
            { key: i },
            _react2.default.createElement(
              'ul',
              { className: 'route' },
              _react2.default.createElement(
                'li',
                { key: i + 'date', className: 'date' },
                date
              ),
              _react2.default.createElement(
                'li',
                { key: i + 'type', className: 'type' },
                type
              ),
              _react2.default.createElement(
                'li',
                { key: i + 'status', className: 'status' },
                status
              ),
              _react2.default.createElement(
                'li',
                { key: i + 'link' },
                _react2.default.createElement(
                  'a',
                  { className: 'btn btn-primary route-view-button', href: '/#/routes/' + route.index },
                  'View'
                )
              )
            )
          );
        })
      );
    } else {
      return _react2.default.createElement(
        'p',
        null,
        'No Previous Bar Routes'
      );
    }
  }
});

function formatDate(isoDate) {
  var formattedDate = (0, _moment2.default)(isoDate).format('ddd M/D/YY');
  return formattedDate;
};

function determineRouteStatus(barArray) {
  var statuses = [],
      result = null;
  for (var i = 0; i < barArray.length; i += 1) {
    if (barArray[i].checked_in) {
      continue;
    } else if (barArray[i].skipped) {
      result = _react2.default.createElement('i', { className: 'fa fa-frown-o' });
      break;
    } else if (!barArray[i].skipped && !barArray[i].checked_in) {
      result = _react2.default.createElement('i', { className: 'fa fa-ellipsis-h' });
      break;
    }
  }
  return result || _react2.default.createElement('i', { className: 'fa fa-smile-o' });
};

function determineRouteType(barArray) {
  var barCount = barArray.length;
  switch (barCount) {
    case 3:
      return 'Fun Run';
      break;
    case 5:
      return '5k';
      break;
    case 8:
      return 'Marathon';
      break;
    default:
      return 'Custom Tour';
      break;
  }
};

module.exports = {
  RouteList: RouteList
};

function filterRoutes(criteria) {
  var recents = 0;
  return function (route, i, arr) {
    var status = route.bars.filter(function (bar) {
      return bar.checked_in || bar.skipped;
    });
    switch (criteria) {
      case 'pending':
        return status.length != route.bars.length;
      case 'recent':
        return status.length != route.bars.length || recents++ < 10;
      default:
        return true;
    }
  };
}