import React from 'react';


var Ratings = React.createClass({
  getInitialState: function() {
    return { rating: Number(this.props.rating) };
  },
  render: function() {
    var beers = [];
    for (var i = 0; i < Math.floor(this.state.rating); i++) {
      beers.push(
        <li className="full-beer">
          <i className="fa fa-beer"></i>
          <div className="beer" style={{ height: '60%' }}></div>
        </li>
      );
    }
    var remainder = this.state.rating % 1;

    if (remainder) {
      beers.push(
        <li className="part-beer">
          <i className="beer-glass fa fa-beer"></i>
          <div className="beer" style={{ height: String(remainder * 100 * .6) + '%' }}></div>
        </li>
      );
    }
    return (
      <ul className="beer-rating">
        <li>Rating:</li>
        {beers}
      </ul>
    );
  }
});


module.exports = {
  Ratings: Ratings
};
