'use strict';

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _statemachine = require('./statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _header = require('./header');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _splashDash = require('./views/splash-dash');

var _newroute = require('./views/newroute');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_jquery2.default.get('/api/users/current-user').done(function (user) {
  if (Object.keys(user).length) {
    _statemachine2.default.updateState('user', user);
  }
  renderApp();
}).fail(renderApp);

var App = _react2.default.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_header.Header, null),
      _react2.default.createElement('main', { id: 'main' }),
      _react2.default.createElement(
        'footer',
        { id: 'footer' },
        _react2.default.createElement(
          'p',
          null,
          'Please drink responsibly.'
        )
      )
    );
  }
});

function renderApp() {
  console.log('here');
  _reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));
  _reactDom2.default.render(_react2.default.createElement(
    _reactRouter.Router,
    { history: _reactRouter.browserHistory },
    _react2.default.createElement(_reactRouter.Route, { path: '/', component: _splashDash.SplashDash }),
    _react2.default.createElement(_reactRouter.Route, { path: '/routes/new', component: _newroute.NewRoute })
  ), document.getElementById('main'));
}

// Goes up there when routes exist^
// <Route path="/routes" component={RouteList} />
// <Route path="/routes/:routeId" component={RouteDetail} />