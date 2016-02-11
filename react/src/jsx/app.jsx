import jQuery from 'jquery';
import statemachine from './statemachine';
import { Header } from './header';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { SplashDash } from './views/splash-dash';
import { NewRoute } from './views/newroute';

jQuery.get('/api/users/current-user').done(function(user) {
  if (Object.keys(user).length) {
    statemachine.updateState('user', user);
  }
  renderApp();
}).fail(renderApp);

var App = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function() {
    return (
      <div>
        <Header />
        <main id="main"></main>
        <footer id="footer"><p>Please drink responsibly.</p></footer>
      </div>
    );
  }
});

function renderApp() {
  console.log('here');
  ReactDOM.render(<App />, document.getElementById('app'));
  ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={SplashDash} />
      <Route path="/routes/new" component={NewRoute} />
    </Router>
  ), document.getElementById('main'));
}

// Goes up there when routes exist^
// <Route path="/routes" component={RouteList} />
// <Route path="/routes/:routeId" component={RouteDetail} />
