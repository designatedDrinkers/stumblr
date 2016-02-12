'use strict';

var _ajaxPromise = require('ajax-promise');

var _ajaxPromise2 = _interopRequireDefault(_ajaxPromise);

var _statemachine = require('./statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _splashDash = require('./views/splash-dash');

var _newroute = require('./views/newroute');

var _settings = require('./views/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Header } from './header';


_ajaxPromise2.default.get('/api/users/current-user').then(function (user) {
  if (Object.keys(user).length) {
    _statemachine2.default.updateState('user', user);
  }
  renderApp(_statemachine2.default.getState().user);
}).catch(renderApp);

var App = _react2.default.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  render: function render() {
    return _react2.default.createElement('div', { id: 'main' });
  }
});

function renderApp(user) {
  _reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));
  // ReactDOM.render(<Header />, document.getElementById('header'));
  if (user) {
    _reactDom2.default.render(_react2.default.createElement(
      _reactRouter.Router,
      { history: _reactRouter.browserHistory },
      _react2.default.createElement(_reactRouter.Route, { path: '/', component: _splashDash.SplashDash }),
      _react2.default.createElement(_reactRouter.Route, { path: '/routes/new', component: _newroute.NewRoute }),
      _react2.default.createElement(_reactRouter.Route, { path: '/settings', component: _settings.Settings })
    ), document.getElementById('main'));
  } else {
    _reactDom2.default.render(_react2.default.createElement(_splashDash.SplashDash, null), document.getElementById('main'));
  }
}

// Goes up there when routes exist^
// <Route path="/routes" component={RouteList} />
// <Route path="/routes/:routeId" component={RouteDetail} />