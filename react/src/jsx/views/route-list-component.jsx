import React from 'react';
import statemachine from '../statemachine';
import moment from 'moment';


var RouteList = React.createClass({
  getInitialState: function(){
    return statemachine.getState();
  },

  render: function(){
    return (
      <ul>
        {this.state.routes.map(function(route, i){
          let date = formatDate(route.date);
          let type = determineRouteType(route.bars);
          let status = determineRouteStatus(route.bars);
          return (
            <li key={i}>{date}
              <ul key={i}>
                <li key={i + 'name'}>{route.name}</li>
                <li key={i + 'type'}>{type}</li>
                <li key={i + 'status'}>{status}</li>
                <li key={i + 'link'}><a href="#">View Route</a></li>
              </ul>
            </li>
          )
        })}
      </ul>
    );
  }
});


function formatDate(isoDate){
  let formattedDate = moment(isoDate).format('dddd MMMM D, YYYY');
  return formattedDate;
};

function determineRouteStatus(barArray){
  let statuses = [];
  let result = null;
  for(var i = 0; i < barArray.length; i += 1){
    if(barArray[i].checked_in){
      continue;
    }else if (barArray[i].skipped){
      result = 'Forefeit';
      break;
    }else if (!barArray[i].skipped && !barArray[i].checked_in){
      result = 'In Process';
      break;
    }
  }
  return result || 'Complete';
};

function determineRouteType(barArray){
  let barCount = barArray.length;
  switch (barCount) {
    case 3:
      return 'Fun Run';
      break;
    case 5:
      return '5k';
      break;
    case 8:
      return 'Marathon';
      break;
    default:
      return 'Custom Tour';
      break;
  }
};

module.exports = {
  RouteList: RouteList
}
