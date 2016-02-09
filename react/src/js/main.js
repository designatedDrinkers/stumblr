"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = _react2.default.createClass({
  displayName: "Main",

  render: function render() {
    return _react2.default.createElement("main", { id: "main" });
  }
});

module.exports = {
  Main: Main
};