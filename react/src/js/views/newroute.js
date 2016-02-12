'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statemachine = require('../statemachine');

var _statemachine2 = _interopRequireDefault(_statemachine);

var _barrouteData = require('../barroute-data');

var _barrouteData2 = _interopRequireDefault(_barrouteData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NewRoute = _react2.default.createClass({
  displayName: 'NewRoute',

  getInitialState: function getInitialState() {
    return _statemachine2.default.getState();
  },
  componentDidMount: function componentDidMount() {
    (0, _barrouteData2.default)(this.state.routeToBe.barcount, this.state.routeToBe.start).then(function (good) {
      console.log(good);
    }).catch(function (bad) {
      console.error(bad);
    });
  },
  render: function render() {
    return _react2.default.createElement(
      'p',
      null,
      '...'
    );
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
  changeStart: function changeStart(e) {
    this.setState({ start: e.target.value, barcount: this.state.barcount });
  },
  changeBarcount: function changeBarcount(e) {
    this.setState({ start: this.state.start, barcount: e.target.value });
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
      _react2.default.createElement('input', { id: 'location', type: 'text', placeholder: 'Use Current Location',
        onChange: this.changeStart, name: 'location', value: this.state.start }),
      _react2.default.createElement(
        'select',
        { name: 'barcount', onChange: this.changeBarcount, value: this.state.barcount },
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
        { className: 'button', type: 'submit' },
        'Create Route'
      )
    );
  }
});

module.exports = {
  NewRoute: NewRoute,
  RouteForm: RouteForm
};