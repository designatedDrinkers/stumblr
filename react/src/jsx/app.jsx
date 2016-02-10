import jQuery from 'jquery';
import statemachine from './statemachine';
import { Header } from './header';
import { Main } from './main';
import React from 'react';
import ReactDOM from 'react-dom';

var App = React.createClass({
  getInitialState: function() {
    return statemachine.reducer(undefined, {});
  },
  componentDidMount: function() {
    jQuery.get('/api/users/current-user').done(function(user) {
      if (Object.keys(user).length) {
        var newState = stateMachine(component.state, { type: 'SET_USER', user: user});
        component.setState(newState);
      }
    });
  },
  render: function() {
    return (
      <div>
        <Header user={this.state.user}/>
        <div id="map"></div>
        <Main user={this.state.user} />
        <footer id="footer"><p>Please drink responsibly.</p></footer>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
