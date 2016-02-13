module.exports = {
  hideMap: function() {
    var map = document.getElementById('map-container');
    var classes = map.className.split(' ');
    var newClassName = classes.filter(function(className) {
      return className !== 'hide';
    });
    map.className = newClassName + ' hide';
  }
}
