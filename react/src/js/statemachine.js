'use strict';

var appState = { user: undefined, routes: [], badges: [], menu: [] };

module.exports = {
  getState: function getState() {
    return appState;
  },
  updateState: function updateState(key, value) {
    appState[key] = value;
    return appState;
  },
  setMenu: function setMenu(type, arg) {
    if (set[type]) {
      this.updateState('menu', set[type](arg));
    } else {
      this.updateState('menu', set.def(arg));
    }
    return appState;
  }
};

var set = {
  dash: function dash() {
    return [{
      link: '#/settings', text: 'Settings'
    }, {
      link: '/auth/logout', text: 'Log Out'
    }];
  },
  details: function details(id) {
    return [{
      link: '#/', text: 'Dashboard'
    }, {
      link: '#/settings', text: 'Settings'
    }, {
      link: '/routes/' + id + '/forfeit', text: 'Forfeit'
    }, {
      link: '/auth/logout', text: 'Log Out'
    }];
  },
  def: function def() {
    return [{
      link: '#/', text: 'Dashboard'
    }, {
      link: '/auth/logout', text: 'Log Out'
    }];
  }
};