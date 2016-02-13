'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _barrouteData = require('../barroute-data');

var _barrouteData2 = _interopRequireDefault(_barrouteData);

var _ajaxPromise = require('ajax-promise');

var _ajaxPromise2 = _interopRequireDefault(_ajaxPromise);

var _header = require('../header');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewRoute = _react2.default.createClass({
  displayName: 'NewRoute',

  getInitialState: function getInitialState() {
    return { loading: true, newName: '' };
  },
  componentDidMount: function componentDidMount() {
    _statemachine2.default.setMenu('def');
    _reactDom2.default.render(_react2.default.createElement(_header.Header, null), document.getElementById('header'));
    var component = this;
    var route = _statemachine2.default.getState().routeToBe;
    (0, _barrouteData2.default)(route.barcount, route.start).then(function (good) {
      component.setState({ loading: false, newName: '' });
      // console.log(good);
    }).catch(function (bad) {
      component.setState({ loading: false, newName: '' });
      // console.error(bad);
    });
  },
  saveRoute: function saveRoute(event) {
    event.preventDefault();
    var route = _statemachine2.default.getState().newBarRoute;
    _ajaxPromise2.default.post('/api/barroutes', {
      name: this.state.newName,
      bars: JSON.stringify(route)
    }).then(function (data) {
      return _ajaxPromise2.default.get('/api/barroutes').then(function (routes) {
        _statemachine2.default.updateState('routes', routes.barRoutes);
      }).then(function () {
        return Promise.resolve(data);
      });
    }).then(function (data) {
      var url = '/#/' + (data.index ? 'routes/' + data.index : '');
      window.location.assign(url);
    }).catch(this.goDashboard);
  },
  goDashboard: function goDashboard(event) {
    if (event) event.preventDefault();
    window.location.assign('/#');
  },
  changeName: function changeName(event) {
    this.setState({ loading: false, newName: event.target.value });
  },
  render: function render() {
    if (this.state.loading) {
      return _react2.default.createElement(
        'p',
        null,
        'Loading...'
      );
    } else {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement('input', { value: this.state.newName, onChange: this.changeName, placeholder: 'Enter Route Name (optional)' }),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: this.saveRoute },
          'Save'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: this.goDashboard },
          'Cancel'
        )
      );
    }
  }
});

var RouteForm = _react2.default.createClass({
  displayName: 'RouteForm',

  getInitialState: function getInitialState() {
    return { start: '', barcount: 3 };
  },
  createRoute: function createRoute(event) {
    event.preventDefault();
    _statemachine2.default.updateState('routeToBe', this.state);
    window.location.assign('/#/routes/new');
  },
  changeStart: function changeStart(event) {
    this.setState({ start: event.target.value, barcount: this.state.barcount });
  },
  changeBarcount: function changeBarcount(event) {
    this.setState({ start: this.state.start, barcount: event.target.value });
  },
  render: function render() {
    return _react2.default.createElement(
      'form',
      { onSubmit: this.createRoute },
      _react2.default.createElement(
        'label',
        { htmlFor: 'location' },
        'Select Starting Point:'
      ),
      _react2.default.createElement('input', { className: 'form-control', id: 'location', type: 'text', placeholder: 'Use Current Location',
        onChange: this.changeStart, name: 'location', value: this.state.start }),
      _react2.default.createElement(
        'select',
        { className: 'form-control', name: 'barcount', onChange: this.changeBarcount, value: this.state.barcount },
        _react2.default.createElement(
          'option',
          { value: '3' },
          'Fun Run'
        ),
        _react2.default.createElement(
          'option',
          { value: '5' },
          '5k'
        ),
        _react2.default.createElement(
          'option',
          { value: '8' },
          'Marathon'
        )
      ),
      _react2.default.createElement(
        'button',
        { className: 'btn btn-primary', type: 'submit' },
        'Create Route'
      )
    );
  }
});

module.exports = {
  NewRoute: NewRoute,
  RouteForm: RouteForm
};