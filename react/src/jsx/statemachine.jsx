let appState = { user: undefined, routes: [], badges: [], menu: [] };

module.exports = {
  getState: function() {
    return appState;
  },
  updateState: function(key, value) {
    appState[key] = value;
    return appState;
  }
};
