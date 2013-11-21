var dbus = require('dbus-native')
  , bus = dbus.sessionBus()
  , ayatana = bus.getService('org.gnome.ScreenSaver')

module.exports = function (callback) {

  ayatana.getInterface('/org/gnome/ScreenSaver', 'org.gnome.ScreenSaver', function(err, bm) {
    bm.on('ActiveChanged', function(state) {
      callback(state)
    })
  })
}