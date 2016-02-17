"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Ratings = _react2.default.createClass({
  displayName: "Ratings",

  getInitialState: function getInitialState() {
    return { rating: Number(this.props.rating) };
  },
  render: function render() {
    var beers = [];
    for (var i = 0; i < this.state.rating; i++) {
      beers.push(_react2.default.createElement(
        "li",
        { className: "full-beer" },
        _react2.default.createElement("i", { className: "fa fa-beer" }),
        _react2.default.createElement("div", { className: "beer", style: { height: '60%' } })
      ));
    }
    var remainder = this.state.rating % 1;

    if (remainder) {
      beers.push(_react2.default.createElement(
        "li",
        { className: "part-beer" },
        _react2.default.createElement("i", { className: "beer-glass fa fa-beer" }),
        _react2.default.createElement("div", { className: "beer", style: { height: String(remainder * 100 * .6) + '%' } })
      ));
    }
    return _react2.default.createElement(
      "ul",
      { className: "beer-rating" },
      beers
    );
  }
});

module.exports = {
  Ratings: Ratings
};