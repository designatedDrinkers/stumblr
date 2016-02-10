import React from 'react';

var Login = React.createClass({
  render: function(){
    return (
      <a href="/auth/twitter"><button className="button">Login with Twitter</button></a>
    );
  }
});

var Dashboard = React.createClass({
  render: function(){
    return (
      <p>You are logged in</p>
    );
  }
});

var SplashDash = React.createClass({
  render: function() {
    console.log(this.props.user);
    if (this.props.user) {
      return <Dashboard />
    } else {
      return <Login />
    }
  }
});

module.exports = {
  SplashDash: SplashDash
};
