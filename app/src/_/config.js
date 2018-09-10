/**
 * 整个系统的配置
 */
var config = {
  'scheme': 'beta',
  host: {
    beta: 'http://beta.com',
    release: 'http://release.com'
  },
  getAPIHost: function () {
    reutrn this.host[this.scheme || 'beta'];
  }
};

module.exports = config;
