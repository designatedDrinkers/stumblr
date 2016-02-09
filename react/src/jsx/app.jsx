import jQuery from 'jQuery';
import React from 'react';
import ReactDOM from 'react-dom';

var Header = React.createClass({
  getInitialState: function() {
    return { user: null };
  },
  componentDidMount: function() {
    var component = this;
    jQuery.ajax({
      method: 'get',
      url: '/api/users/current-user'
    }).done(function(user) {
      if (Object.keys(user).length) {
        component.setState({ user: user });
      }
    }).fail(console.log);
  },
  render: function(){
    console.log(this.state);
    if (this.state.user) {
      return (
        <nav>
          <p>Stumblr</p>
          <Menu />
        </nav>
      );
    } else {
      return (
        <nav>
          <p>Stumblr</p>
        </nav>
      );
    }
  }
});

var Menu = React.createClass({
  getInitialState: function(){
    return {
      menu: [
        {
          text: 'menu item 1',
          link: 'google.com'
        },
        {
          text: 'menu item 2',
          link: 'amazon.com'
        }
      ]
    };
  },
  render: function(){
    var lis = this.state.menu.map(function(item, i){
      return <li key={i}>{item.text}</li>
    })
    return (
      <ul className="data-responsive-menu">
        {lis}
      </ul>
    );
  }
})

var Login = React.createClass({
  render: function(){
    return (
      <a href="/auth/twitter"><button className="button">Login with Twitter</button></a>
    );
  }
});

ReactDOM.render(<Header />, jQuery('#header')[0]);
ReactDOM.render(<Login />, jQuery('#main')[0]);
