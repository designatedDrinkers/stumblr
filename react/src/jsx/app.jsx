import jquery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

var Header = React.createClass({
  render: function(){
    return <p>Hello</p>
  }
});

ReactDOM.render(<Header />, jquery('#header')[0]);
