import React from 'react';
import statemachine from './statemachine';
import ajax from 'ajax-promise';

var Header = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function() {
    if (this.state.user) {
      return (
        <nav className="navbar">
          <div className="navbar-header">
            <a className="navbar-brand" href="#/">
              <img className="pull-left logo" src="images/stumblr-logo.png" />
              <span className="pull-left">Stumblr</span>
            </a>
            <Menu />
          </div>
        </nav>
      );
    } else {
      return (
        <header>
          <nav className="navbar">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">
                  <img className="pull-left logo" src="images/stumblr-logo.png" />
                  <span className="pull-left">Stumblr</span>
                </a>
              </div>
            </div>
          </nav>
        </header>
      );
    }
  }
});

var Menu = React.createClass({
  getInitialState: function(){
    return statemachine.getState();
  },
  render: function() {
    var component = this;
    var lis = this.state.menu.map(function(item, i) {
      return (
        <li key={i} className="dropdown" role="presentation">
          <a href={item.link}>
            {item.text}
          </a>
        </li>
      );
    });
    if (lis.length) {
      return (
        <div className="hamburger nav navbar-nav navbar-right">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"><span className="glyphicon glyphicon-menu-hamburger"></span></a>
          <ul className="dropdown-menu">
            {lis}
          </ul>
        </div>
      );
    } else {
      return (
        <span></span>
      );
    }
  }
})

module.exports = {
  Header: Header
};
