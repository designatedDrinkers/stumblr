let appState = { user: undefined, routes: [], badges: [], menu: [] };

module.exports = {
  getState: function() {
    return appState;
  },
  updateState: function(key, value) {
    appState[key] = value;
    return appState;
  },
  setMenu: function(type, arg) {
    if (set[type]) {
      this.updateState('menu', set[type](arg));
    } else {
      this.updateState('menu', set.def(arg));
    }
    return appState;
  }
};


const set = {
  dash: function() {
    return [{
      link: '#/settings', text: 'Settings'
    },{
      link: '/auth/logout', text: 'Log Out'
    }];
  },
  details: function(id) {
    return [{
      link: '#/', text: 'Dashboard'
    },{
      link: '#/settings', text: 'Settings'
    },{
      link: '/routes/' + id + '/forfeit', text: 'Forfeit'
    },{
      link: '/auth/logout', text: 'Log Out'
    }];
  },
  def: function() {
    return [{
      link: '#/', text: 'Dashboard'
    },{
      link: '/auth/logout', text: 'Log Out'
    }]
  },
  none: function() {
    return [];
  }
};
