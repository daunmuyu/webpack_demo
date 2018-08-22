const glob = require('glob')
const path = require('path')

const pagesPath = './src/pages/**/index.js';
var pages = [];
glob.sync(pagesPath).forEach(function (filepath) {
  const dir = path.dirname(filepath);
  const filename = dir.replace('./src/pages/', '') + '/index'
  pages.push({
    filename,
    dir
  });
});

module.exports = pages;