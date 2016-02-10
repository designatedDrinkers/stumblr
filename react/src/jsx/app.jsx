import jQuery from 'jquery';
import statemachine from './statemachine';
import { Header } from './header';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { SplashDash } from './views/splash-dash';
import { NewRoute } from './views/newroute';

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
        <main id="main" state={this.state}></main>
        <footer id="footer"><p>Please drink responsibly.</p></footer>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={SplashDash} />
    <Route path="/routes/new" component={NewRoute} />
  </Router>
), document.getElementById('main'));
// Goes up there ^
// <Route path="/routes" component={RouteList} />

// <Route path="/routes/:routeId" component={RouteDetail} />
