import ajax from 'ajax-promise';
import statemachine from './statemachine';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { SplashDash } from './views/splash-dash';
import { NewRoute } from './views/newroute';
import { Settings } from './views/settings';
import { RouteDetails } from './views/routedetails';

Promise.all([
  ajax.get('/api/users/current-user'),
  ajax.get('/api/barroutes')
]).then(function(data) {
  var user = data[0];
  var routes = data[1];
  if (Object.keys(user).length) {
    statemachine.updateState('user', user);
  }
  statemachine.updateState('routes', routes.barRoutes);
  renderApp(statemachine.getState().user);
}).catch(renderApp);

var App = React.createClass({
  getInitialState: function() {
    return statemachine.getState();
  },
  render: function() {
    return (
      <div id="main"></div>
    );
  }
});


function renderApp(user) {
  ReactDOM.render(<App />, document.getElementById('app'));
  // ReactDOM.render(<Header />, document.getElementById('header'));
  if (user) {
    ReactDOM.render((
      <Router history={browserHistory}>
        <Route path="/" component={SplashDash} />
        <Route path="/routes/new" component={NewRoute} />
        <Route path="/routes/:index" component={RouteDetails} />
        <Route path="/settings" component={Settings} />
      </Router>
    ), document.getElementById('main'));
  } else {
    ReactDOM.render(<SplashDash />, document.getElementById('main'));
  }
}
