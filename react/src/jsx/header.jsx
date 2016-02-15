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
        <header>
          <nav className="navbar">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">
                  <img className="pull-left logo" src="images/stumblr-logo.png" />
                  <span className="pull-left">Stumblr</span>
                </a>
                <ul className="hamburger nav navbar-nav navbar-right">
                  <li role="presentation" className="dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button"><span className="glyphicon glyphicon-menu-hamburger"></span></a>
                    <Menu />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
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
        <li key={i}>
          <a href={item.link}>
            {item.text}
          </a>
        </li>
      );
    });
    if (lis.length) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"><span className="glyphicon glyphicon-menu-hamburger"></span></a>
            <ul className="dropdown-menu">
              {lis}
            </ul>
          </li>
        </ul>
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
