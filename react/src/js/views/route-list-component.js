'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouteList = _react2.default.createClass({
  displayName: 'RouteList',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },

  render: function render() {
    var routes = this.state.routes;
    if (routes) {
      return _react2.default.createElement(
        'ul',
        null,
        routes.map(function (route, i) {
          var date = formatDate(route.date);
          var type = determineRouteType(route.bars);
          var status = determineRouteStatus(route.bars);
          return _react2.default.createElement(
            'li',
            { key: i },
            date,
            _react2.default.createElement(
              'ul',
              { key: i },
              _react2.default.createElement(
                'li',
                { key: i + 'name' },
                route.name
              ),
              _react2.default.createElement(
                'li',
                { key: i + 'type' },
                type
              ),
              _react2.default.createElement(
                'li',
                { key: i + 'status' },
                status
              ),
              _react2.default.createElement(
                'li',
                { key: i + 'link' },
                _react2.default.createElement(
                  'a',
                  { href: '/#/routes/' + i },
                  'View Route'
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
  var formattedDate = (0, _moment2.default)(isoDate).format('dddd MMMM D, YYYY');
  return formattedDate;
};

function determineRouteStatus(barArray) {
  var statuses = [];
  var result = null;
  for (var i = 0; i < barArray.length; i += 1) {
    if (barArray[i].checked_in) {
      continue;
    } else if (barArray[i].skipped) {
      result = 'Forefeit';
      break;
    } else if (!barArray[i].skipped && !barArray[i].checked_in) {
      result = 'In Process';
      break;
    }
  }
  return result || 'Complete';
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