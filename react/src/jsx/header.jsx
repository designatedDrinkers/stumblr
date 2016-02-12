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
          <nav class="navbar navbar-default">
            <div class="container-fluid">
              <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                </button>
                <img className="logo" src="images/stumblr-logo.png" />
                <a class="navbar-brand" href="#">Stumblr</a>
                <ul class="nav navbar-nav navbar-right">
                  <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Dropdown <span class="caret"></span></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
      );
    } else {
      return (
        <nav>
          <div className="title-area left">
            <img className="logo" src="images/stumblr-logo.png" />
            <span>Stumblr</span>
          </div>
        </nav>
      );
    }
  }
});

var Menu = React.createClass({
  getInitialState: function(){
    return statemachine.getState();
  },
  componentDidMount: function() {
    // generate menu...
    var menu = [{
      link: '#/settings', text: 'Settings'
    },{
      link: '/auth/logout', text: 'Log Out'
    }];
    this.setState(statemachine.updateState('menu', menu));
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
    return (
      <ul className="dropdown-menu">
        {lis}
      </ul>
    );
  }
})

module.exports = {
  Header: Header
};
