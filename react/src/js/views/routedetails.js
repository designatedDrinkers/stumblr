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

var currentBar;
var currentRoute;

var RouteDetails = _react2.default.createClass({
  displayName: 'RouteDetails',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  componentDidMount: function componentDidMount() {
    _statemachine2.default.setMenu('def');
    _reactDom2.default.render(_react2.default.createElement(_header.Header, null), document.getElementById('header'));
    var component = this;
    currentRoute = this.props.params.index;
    _ajaxPromise2.default.get('/api/barroutes/' + this.props.params.index).then(function (result) {
      component.setState(_statemachine2.default.updateState('currentRoute', result.route));
      _barrouteData2.default.recreate(result.route);
    });
  },
  skip: function skip(i) {
    currentBar = i;
    var component = this;
    _ajaxPromise2.default.put('/api/barroutes/' + this.props.params.index, { bar_id: i, skip: true }).then(function (result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(_statemachine2.default.updateState('currentRoute', component.state.currentRoute));
      tweet(null, component.props.params.index);
    });
  },
  checkIn: function checkIn(i) {
    currentBar = i;
    var component = this;
    var route_index = this.props.params.index;
    _ajaxPromise2.default.put('/api/barroutes/' + this.props.params.index, { bar_id: i, check_in: true }).then(function (result) {
      component.state.currentRoute.bars[i] = result.bar;
      component.setState(_statemachine2.default.updateState('currentRoute', component.state.currentRoute));
      if (component.state.user.auto_tweet === null) {
        component.setState(_statemachine2.default.updateState('showModal', true));
      } else {
        tweet(i, route_index, component.state.user.auto_tweet);
      }
    });
  },
  forfeit: function forfeit(i) {
    var component = this;
    var bars = currentRoute.bars;
    console.log('forfeit', this.props.params.index);
    _ajaxPromise2.default.put('/api/barroutes/' + this.props.params.index, { forfeit: true }).then(function (response) {
      console.log(response);
      component.setState(_statemachine2.default.updateState('currentRoute', response.route));
      window.location.assign('#/routes/' + component.props.params.index + '/done');
    });
  },
  complete: isRouteComplete,
  render: function render() {
    var lis = composeList(this, this.state.currentRoute);
    var modal = this.state.user.auto_tweet === null ? _react2.default.createElement(TweetModal, null) : '';
    var showFButton = this.complete();
    if (lis.length) {
      return _react2.default.createElement(
        'div',
        { className: 'route-details' },
        _react2.default.createElement(
          'ul',
          { className: 'bar-list' },
          _react2.default.createElement(
            'li',
            { key: '-1' },
            'Route Details: "',
            this.state.currentRoute.name,
            '"'
          ),
          lis
        ),
        modal,
        !showFButton ? _react2.default.createElement(
          'button',
          { className: 'btn btn-warning', onClick: this.forfeit },
          'Forfeit'
        ) : null
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

// var Forfeit = React.createClass({
//   render: function(){
//     return(
//
//     )
//   }
// })

var TweetModal = _react2.default.createClass({
  displayName: 'TweetModal',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  hideModal: function hideModal() {
    this.setState(_statemachine2.default.updateState('showModal', false));
    tweet(currentBar, currentRoute, false);
  },
  tweetAndHide: function tweetAndHide() {
    this.setState(_statemachine2.default.updateState('showModal', false));
    tweet(currentBar, currentRoute, true);
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'modal fade', id: 'tweet-modal', tabIndex: '-1' },
      _react2.default.createElement(
        'div',
        { className: 'modal-dialog' },
        _react2.default.createElement(
          'div',
          { className: 'modal-content' },
          _react2.default.createElement(
            'div',
            { className: 'modal-header' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'close', 'data-dismiss': 'modal' },
              _react2.default.createElement(
                'span',
                null,
                '×'
              )
            ),
            _react2.default.createElement(
              'h4',
              { className: 'modal-title', id: 'myModalLabel' },
              'Tweet!'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-body' },
            'Would you like to tweet your check in?'
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal-footer' },
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-info', 'data-dismiss': 'modal', onClick: this.tweetAndHide },
              'Yes'
            ),
            _react2.default.createElement(
              'button',
              { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal', onClick: this.hideModal },
              'No'
            )
          )
        )
      )
    );
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
          { className: 'btn btn-primary', onClick: checkIn, 'data-toggle': 'modal', 'data-target': '#tweet-modal' },
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

function tweet(bar_index, route_index, autoTweet) {
  if (autoTweet) {
    _ajaxPromise2.default.post('/api/twitter/checkin', { bar_index: bar_index, route_index: route_index }).then(function (data) {
      if (isRouteComplete()) {
        window.location.assign('#/routes/' + route_index + '/done');
      }
    });
  } else {
    if (isRouteComplete()) {
      window.location.assign('#/routes/' + route_index + '/done');
    }
  }
}

function isRouteComplete() {
  var route = _statemachine2.default.getState().currentRoute || { bars: [{}] };
  return route.bars.filter(function (bar) {
    return bar.checked_in || bar.skipped;
  }).length == route.bars.length;
}