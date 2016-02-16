var Promise = require('promise');

var milliDay = 1000 * 60 * 60 * 24;

var condition = {
  desDrinker: function(index, user) {
    // two marathons one day
    var date = user.routes[index].date;
    var elligible = user.routes.filter(function(route, i) {
      return status(route) && timely(route, date) && dateDist(route.date, date) < 1 &&
      route.bars.length == 8 && i < index;
    });
    if (elligible.length && status(user.routes[index]) && user.routes[index].bars.length === 8) {
      return award(user, { name: 'Designated Drinker', image: '/images/badges/designated-drinker.png' });
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
      return award(user, { name: 'Triple Crown', image: '/images/badges/triple-crown.png' });
    }
  },
  funRun: function(index, user) {
    // 3 bars
    if (status(user.routes[index]) && user.routes[index].bars.length == 3) {
      return award(user, { name: 'Fun Run', image: '/images/badges/fun-run.png' });
    }
  },
  fiveK: function(index, user) {
    // 5 bars
    if (status(user.routes[index]) && user.routes[index].bars.length == 5) {
      return award(user, { name: '5k', image: '/images/badges/5k.png' });
    }
  },
  marathon: function(index, user) {
    // 8 bars
    if (status(user.routes[index]) && user.routes[index].bars.length == 8) {
      return award(user, { name: 'Marathon', image: '/images/badges/marathon.png' });
    }
  },
  partyFoul: function(index, user) {
    // route forfeited
    if (status(user.routes[index]) === false) {
      return award(user, { name: 'Party Foul', image: '/images/badges/party-foul.png' });
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
      return award(user, { name: 'Bender', image: '/images/badges/bender.png' });
    }
  },
  alcoholic: function(index, user) {
    // 10 completions
    var completions = user.routes.filter(status).length;
    if (status(user.routes[index]) && completions % 10 == 0) {
      return award(user, { name: 'AA', image: '/images/badges/alcoholic.png' });
    }
  },
  speedDrinker: function(index, user) {
    // #bars / #hours < 1
    var timeliness = timely(user.routes[index], user.routes[index].date) * 24;
    if (status(user.routes[index]) && timeliness <= user.routes[index].bars.length) {
      return award(user, { name: 'Speed Drinker', image: '/images/badges/speed-drinker.png' });
    }
  },
  desDriver: function(index, user) {
    // 3 consecutive forfeits
    var i = Number(index), routes = user.routes;
    if (i >= 2 && status(routes[i]) === false &&
      status(routes[i - 1]) === false && status(routes[i - 2]) === false) {
      return award(user, { name: 'Designated Driver', image: '/images/badges/designated-driver.png' });
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
