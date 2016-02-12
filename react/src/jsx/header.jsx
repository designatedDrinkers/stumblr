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
        // <header className="contain-to-grid sticky">
          <div className="top-bar">
            <div className="top-bar-left">
              <ul className="dropdown menu" data-dropdown-menu>
                <li><img className="logo" src="images/stumblr-logo.png" /></li>
                <li className="menu-text">Stumblr</li>
              </ul>
            </div>
            <div className="top-bar-right">
              <ul className="dropdown menu" data-dropdown-menu>
                <li>
                  <a href="#" className="menu-icon"></a>
                  <ul className="menu vertical">
                    <Menu />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        // </header>
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
