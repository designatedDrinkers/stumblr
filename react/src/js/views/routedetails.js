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

var _tweetmodal = require('./tweetmodal');

var _tweetmodal2 = _interopRequireDefault(_tweetmodal);

var _ratings = require('./ratings');

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
    _statemachine2.default.updateState('currentRouteIndex', this.props.params.index);
    _ajaxPromise2.default.get('/api/barroutes/' + this.props.params.index).then(function (result) {
      component.setState(_statemachine2.default.updateState('currentRoute', result.route));
      _barrouteData2.default.recreate(result.route);
    });
  },
  skip: function skip(i) {
    _statemachine2.default.updateState('currentBarIndex', i);
    var component = this;
    _ajaxPromise2.default.put('/api/barroutes/' + this.props.params.index, { bar_id: i, skip: true }).then(function (result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(_statemachine2.default.updateState('currentRoute', component.state.currentRoute));
      if (isRouteComplete()) {
        var newBadges = result.newBadges || [];
        component.setState(_statemachine2.default.updateState('newBadges', newBadges));
      }
      _tweetmodal2.default.tweet(null, component.props.params.index, null, null, isRouteComplete);
    });
  },
  checkIn: function checkIn(i, message) {
    _statemachine2.default.updateState('currentBarIndex', i);
    var component = this;
    var route_index = this.props.params.index;
    _ajaxPromise2.default.put('/api/barroutes/' + this.props.params.index, { bar_id: i, check_in: true }).then(function (result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(_statemachine2.default.updateState('currentRoute', component.state.currentRoute));
      document.getElementById('tweet-message-box').value = message;
      if (isRouteComplete()) {
        var newBadges = result.newBadges || [];
        component.setState(_statemachine2.default.updateState('newBadges', newBadges));
      }
      if (component.state.user.auto_tweet !== null) {
        _tweetmodal2.default.tweet(i, route_index, component.state.user.auto_tweet, message, isRouteComplete);
      }
    });
  },
  forfeit: function forfeit(i) {
    var component = this;
    _ajaxPromise2.default.put('/api/barroutes/' + this.props.params.index, { forfeit: true }).then(function (response) {
      var newBadges = response.newBadges || [];
      component.setState(_statemachine2.default.updateState('newBadges', newBadges));
      window.location.assign('#/routes/' + component.props.params.index + '/done');
    });
  },
  complete: isRouteComplete,
  focus: function focus(i) {
    var component = this;
    console.log(component.state.currentRoute.bars[i]);
    window.mapAccess.map.setCenter(component.state.currentRoute.bars[i].geometry.location);
  },
  render: function render() {
    var lis = composeList(this, this.state.currentRoute);
    var modal = this.state.user.auto_tweet === null ? _react2.default.createElement(_tweetmodal2.default.TweetModal, { isRouteComplete: isRouteComplete }) : '';
    var showFButton = this.complete();
    if (lis.length) {
      return _react2.default.createElement(
        'div',
        { className: 'route-details' },
        !showFButton ? _react2.default.createElement(
          'div',
          { className: 'forfeit-container' },
          _react2.default.createElement(
            'button',
            { className: 'btn btn-danger forfeit-btn', onClick: this.forfeit },
            'Forfeit'
          )
        ) : null,
        _react2.default.createElement(
          'ul',
          { className: 'bar-list' },
          _react2.default.createElement(
            'li',
            { key: '-1' },
            'Route Details: "',
            this.state.currentRoute.name || '(No Name)',
            '"'
          ),
          lis
        ),
        modal
      );
    } else {
      return _react2.default.createElement(
        'div',
        { className: 'route-details loading' },
        _react2.default.createElement('i', { className: 'fa fa-beer fa-spin' })
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
        { key: i, className: 'bar-status well' },
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            { className: 'bar-name' },
            bar.name,
            ': '
          ),
          bar.vicinity
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
      var checkIn = component.checkIn.bind(component, i, _tweetmodal2.default.defaultCheckIn(bar.name));
      var skip = component.skip.bind(component, i);
      var focus = component.focus.bind(component, i);
      return _react2.default.createElement(
        'li',
        { key: i, className: 'bar-status well' },
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            'span',
            { className: 'bar-name' },
            bar.name,
            ': '
          ),
          bar.vicinity
        ),
        _react2.default.createElement(_ratings.Ratings, { rating: bar.rating }),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-success', onClick: checkIn, 'data-toggle': 'modal', 'data-target': '#tweet-modal' },
          'Check In'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-warning', onClick: skip },
          'Skip'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: focus },
          _react2.default.createElement('i', { className: 'fa fa-crosshairs' })
        )
      );
    }
  });
  return lis;
}

function isRouteComplete() {
  var route = _statemachine2.default.getState().currentRoute || { bars: [{}] };
  return route.bars.filter(function (bar) {
    return bar.checked_in || bar.skipped;
  }).length == route.bars.length;
}