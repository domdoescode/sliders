var os = require('os')
  , properties = require('./properties')
  , database = require('./lib/database')(properties.database)
  , timeout

// console.log = function () {}

database.connect(function () {
  switch (os.platform()) {
  case 'linux':
    var loop = require('./linux/monitor-application-change')
      , lock = require('./linux/detect-screen-lock')
    break
  default:
    throw new Error(os.platform() + ' has not been implemented yet!')
    break
  }

  startLoop()

  lock(function (state) {
    if (state === 1) {
      if (timeout) clearTimeout(timeout)
    } else {
      startLoop()
    }
  })

  function startLoop() {
    timeout = loop(function () {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(startLoop, 500)
    })
  }
})