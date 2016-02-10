import jQuery from 'jquery';
import statemachine from './statemachine';
import { Header } from './header';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { SplashDash } from './views/splash-dash';

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
<<<<<<< HEAD
        <Main user={this.state.user} />
        <footer id="footer"><p>Please drink responsibly.</p></footer>
=======
        <main id="main" state={this.state}></main>
        <footer>Please drink responsibly.</footer>
>>>>>>> 22bf85d53a5ba6065067b5070ef7f166c2e445c3
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={SplashDash} />
  </Router>
), document.getElementById('main'));
// Goes up there ^
// <Route path="/routes" component={RouteList} />
// <Route path="/routes/new" component={RouteNew} />
// <Route path="/routes/:routeId" component={RouteDetail} />
