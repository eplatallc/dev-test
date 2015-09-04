
var config = {

  expressPort: 8080,

  webpackDevServerPort: 2992,

  webpackVirtualDir: '_tmp',

  host: 'localhost',

  appName: 'app',

  getPublicPath: function getPublicPath() {
    return './public'
  },

  getDevPublicPath: function getDevPublicPath() {
    return '/' + config.webpackVirtualDir
  },

  getDevClientApp: function getDevClientApp() {
    return 'http://' + config.host + ':' + config.webpackDevServerPort
          + config.getDevPublicPath() + config.getClientApp()
  },

  getClientApp: function getClientApp() {
    return '/' + config.appName + '.js'
  }

}

module.exports = config
