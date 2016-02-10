"use strict";

var appState = { user: undefined, routes: [], badges: [], menu: [] };

module.exports = {
  getState: function getState() {
    return appState;
  },
  updateState: function updateState(key, value) {
    appState[key] = value;
    return appState;
  }
};