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
        <header id="header" className="top-bar-left" data-responsive-toggle data-hide-for="medium">
          <div className="title-bar-title">Stumblr</div>
          <button className="menu-icon" type="button" data-toggle>
            <Menu />
          </button>
        </header>
      );
    } else {
      return (
        <header id="header" className="top-bar-left" data-responsive-toggle data-hide-for="medium">
          <div className="title-bar-title">Stumblr</div>
        </header>
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
      <ul className="menu" data-responsive-menu="drilldown medium-dropdown">
        {lis}
      </ul>
    );
  }
})

module.exports = {
  Header: Header
};
