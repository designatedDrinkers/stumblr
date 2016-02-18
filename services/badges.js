var Promise = require('promise');

var milliDay = 1000 * 60 * 60 * 24;

var badges = {
  'Designated Drinker': {
    name: 'Designated Drinker',
    image: '/images/badges/designated-drinker.png',
    description: 'Complete Two Marathons in a day!'
  },
  'Triple Crown': {
    name: 'Triple Crown',
    image: '/images/badges/triple-crown.png',
    description: 'Complete at least one fun run, 5k, and marathon.'
  },
  'Fun Run': {
    name: 'Fun Run',
    image: '/images/badges/fun-run.png',
    description: 'Complete a 3-bar route'
  },
  '5k': {
    name: '5k',
    image: '/images/badges/5k.png',
    description: 'Complete a 5-bar route'
  },
  'Marathon': {
    name: 'Marathon',
    image: '/images/badges/marathon.png',
    description: 'Complete an 8-bar route. Whoa, slow down there.'
  },
  'Party Foul': {
    name: 'Party Foul',
    image: '/images/badges/party-foul.png',
    description: 'Forfeit or skip any part of a route. Not cool.'
  },
  'Bender': {
    name: 'Bender',
    image: '/images/badges/bender.png',
    description: '3 Routes. 3 Days. No Regrets.'
  },
  'AA': {
    name: 'AA',
    image: '/images/badges/alcoholic.png',
    description: 'Complete 10 routes without reconsidering your life choices.'
  },
  'Speed Drinker': {
    name: 'Speed Drinker',
    image: '/images/badges/speed-drinker.png',
    description: 'You party hard and fast.'
  },
  'Designated Driver': {
    name: 'Designated Driver',
    image: '/images/badges/designated-driver.png',
    description: 'Habitually failing to finish what you\'ve started'
  }
}

var condition = {
  desDrinker: function(index, user) {
    // two marathons one day
    var date = user.routes[index].date;
    var elligible = user.routes.filter(function(route, i) {
      return status(route) && timely(route, date) && dateDist(route.date, date) < 1 &&
      route.bars.length == 8 && i < index;
    });
    if (elligible.length && status(user.routes[index]) && user.routes[index].bars.length === 8) {
      return award(user, badges['Designated Drinker']);
    }
  },
  tripleCrown: function(index, user) {
    // one of each
    var awards = ['Fun Run', '5k', 'Marathon', 'Triple Crown'].map(function(name) {
      return user.badges.filter(function(badge) {
        return badge.name == name;
      }).length;
    });
    if (awards[0] && awards[1] && awards[2] && !awards[3] && status(user.routes[index])) {
      return award(user, badges['Triple Crown']);
    }
  },
  funRun: function(index, user) {
    // 3 bars
    if (status(user.routes[index]) && user.routes[index].bars.length == 3) {
      return award(user, badges['Fun Run']);
    }
  },
  fiveK: function(index, user) {
    // 5 bars
    if (status(user.routes[index]) && user.routes[index].bars.length == 5) {
      return award(user, badges['5k']);
    }
  },
  marathon: function(index, user) {
    // 8 bars
    if (status(user.routes[index]) && user.routes[index].bars.length == 8) {
      return award(user, badges['Marathon']);
    }
  },
  partyFoul: function(index, user) {
    // route forfeited
    if (status(user.routes[index]) === false) {
      return award(user, badges['Party Foul']);
    }
  },
  bender: function(index, user) {
    // 3 completions on consecutive days
    var completed = status(user.routes[index]) && timely(user.routes[index], user.routes[index].date);
    var elligible = user.routes.filter(function(route, i) {
      return i <= index  && status(route) && timely(route, route.date) &&
        dateDist(route.date, user.routes[index].date) <= 2;
    });
    if (elligible.length >= 3 && elligible.length % 3 == 0 && completed) {
      return award(user, badges['Bender']);
    }
  },
  alcoholic: function(index, user) {
    // 10 completions
    var completions = user.routes.filter(status).length;
    if (status(user.routes[index]) && completions % 10 == 0) {
      return award(user, badges['AA']);
    }
  },
  speedDrinker: function(index, user) {
    // #bars / #hours < 1
    var timeliness = timely(user.routes[index], user.routes[index].date) * 24;
    if (status(user.routes[index]) && timeliness <= user.routes[index].bars.length) {
      return award(user, badges['Speed Drinker']);
    }
  },
  desDriver: function(index, user) {
    // 3 consecutive forfeits
    var i = Number(index), routes = user.routes;
    if (i >= 2 && status(routes[i]) === false &&
      status(routes[i - 1]) === false && status(routes[i - 2]) === false) {
      return award(user, badges['Designated Driver']);
    }
  }
};

module.exports = function(index, user) {
  return Object.keys(condition).map(function(key) {
    return condition[key](index, user);
  }).filter(Boolean);
};

function dateDist(date1, date2) {
  return Math.abs(Date.parse(date1) - Date.parse(date2)) / milliDay;
}

function status(route) {
  var completed = route.bars.filter(function(bar) {
    return bar.checked_in;
  }).length == route.bars.length;
  var forfeited = route.bars.filter(function(bar) {
    return bar.checked_in || bar.skipped;
  }).length == route.bars.length && !completed;
  if (completed) return true;
  else if (forfeited) return false;
  else return null;
}

function timely(route, date) {
  return route.bars.filter(function(bar) {
    return dateDist(bar.checked_in, date) <= 1;
  }).length == route.bars.length;
}

function award(user, award) {
  var existing = user.badges.filter(function(badge) {
    return badge.name == award.name;
  })[0];
  if (existing) {
    existing.quantity++;
  } else {
    user.badges.push(award);
    award.quantity = 1;
  }
  return existing || award;
}
