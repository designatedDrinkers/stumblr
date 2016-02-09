'use strict';

module.exports = {
  reducer: function reducer(state, action) {
    if (!state) state = { user: undefined, routes: [], badges: [], menu: [] };
    var newState = copyState(state);
    switch (action.type) {
      case 'SET_USER':
        newState.user = action.user;
        return newState;
      case 'SET_MENU_ITEMS':
        newState.menu = action.menu;
        return newState;
      default:
        return newState;
    }
  }
};

function copyState(state) {
  return Object.keys(state).reduce(function (newState, key) {
    newState[key] = state[key];
    return newState;
  }, {});
}