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

var _methods = require('../methods');

var _methods2 = _interopRequireDefault(_methods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RouteComplete = _react2.default.createClass({
  displayName: 'RouteComplete',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  componentDidMount: function componentDidMount() {
    _statemachine2.default.setMenu('def');
    _reactDom2.default.render(_react2.default.createElement(_header.Header, null), document.getElementById('header'));
    _methods2.default.hideMap();
    var component = this;
    _ajaxPromise2.default.get('/api/barroutes/' + this.props.params.index).then(function (result) {
      component.setState(_statemachine2.default.updateState('currentRoute', result.route));
    });
  },
  render: function render() {
    var status = isRouteComplete((this.state.currentRoute || {}).bars);
    if (status) {
      return _react2.default.createElement(
        'div',
        { className: 'done-container' },
        _react2.default.createElement(
          'h1',
          { className: 'win' },
          'Route Complete!'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'You earned a badge...'
        ),
        _react2.default.createElement('img', { src: '../images/badge-placeholder.png', alt: 'badge icon' }),
        _react2.default.createElement(
          'button',
          { className: 'btn', onClick: launchUber },
          'Call an Uber'
        )
      );
    } else {
      return _react2.default.createElement(
        'div',
        { className: 'done-container' },
        _react2.default.createElement(
          'h1',
          { className: 'fail' },
          'Route Forfeited.'
        ),
        _react2.default.createElement(
          'h3',
          null,
          'You earned a badge...'
        ),
        _react2.default.createElement('img', { src: '../images/badge-placeholder.png', alt: 'badge icon' }),
        _react2.default.createElement(
          'button',
          { className: 'btn', onClick: launchUber },
          'Call an Uber'
        )
      );
    }
  }
});

function isRouteComplete(barArray) {
  barArray = barArray || [{}];
  return barArray.filter(function (bar) {
    return bar.checked_in;
  }).length == barArray.length;
};

function launchUber() {
  var deepLink = 'uber://?action=setPickup&pickup=my_location';
  var uberURL = 'https://m.uber.com/sign-up';
  var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
  var isAndroid = navigator.userAgent.match(/android/i) != null;

  if (isiPhone) {
    //   if ([[UIApplication sharedApplication] canOpenURL:[NSURL URLWithString:@"uber://"]]) {
    //     window.location = deepLink;
    //   } else {
    //     window.location = 'https://itunes.apple.com/us/app/uber/id368677368?mt=8'
    //   }
    // } else if (isAndroid) {
    //   if(is installed on android){
    //     window.location = deepLink;
    //   } else {
    //     window.location = 'https://play.google.com/store/apps/details?id=com.ubercab';
    //   }
  }
}

module.exports = {
  RouteComplete: RouteComplete
};