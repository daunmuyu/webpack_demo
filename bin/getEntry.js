var path = require('path');
var glob = require('glob');


function getEntry(sourcePath, isBuild) {
  var entrys = {};
  var basename;
  sourcePath = sourcePath || './app/src/*/*/*.jade';
  glob.sync(sourcePath).forEach(function (entry) {
    // if (entry.indexOf('/_/') < 0) {
    if (!/\/_\/|\/plugins\/|\/custom_plugins\//g.test(entry)) {
      var basename = entry.replace('./app/src/', '');
      basename = basename.substr(0, basename.lastIndexOf('.'));
      // entrys[basename] = entry;
      if (entry.indexOf('.js') > 1 && !isBuild) {
        entrys[basename] = [entry];
      } else {
        entrys[basename] = entry;
      }
    }
  });
  return entrys;
}

// var result = getEntry();
// console.log(result);

module.exports = getEntry;
