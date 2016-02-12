import ajax from 'ajax-promise';
import statemachine from './statemachine';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { SplashDash } from './views/splash-dash';
import { NewRoute } from './views/newroute';
import { Settings } from './views/settings';

ajax.get('/api/users/current-user').then(function(user) {
  if (Object.keys(user).length) {
    statemachine.updateState('user', user);
  }
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
        <Route path="/settings" component={Settings} />
      </Router>
    ), document.getElementById('main'));
  } else {
    ReactDOM.render(<SplashDash />, document.getElementById('main'));
  }
}

// Goes up there when routes exist^
// <Route path="/routes" component={RouteList} />
// <Route path="/routes/:routeId" component={RouteDetail} />
