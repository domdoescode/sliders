var exec = require('child_process').exec
  , util = require('util')
  , mongoose = require('mongoose')
  , Entry = require('../models/entry-schema')
  , cmd = 'xwininfo -id $(xprop -root|grep ^_NET_ACTIVE_WINDOW|cut -d \' \' -f 5) | head -2 | cut -d \'"\' -f 2'
  , last = ''
  , lastDate = new Date()

module.exports = function (callback) {
  var xwininfo = exec(cmd, function (err, stdout, stderr) {
    if (last !== stdout) {
      var now = new Date()
        , entry = new Entry(
          { title: stdout.trim()
          , start: lastDate
          , end: now
          , duration: now.getTime() - lastDate.getTime()
          })

      entry.save(function (err) {
        if (err) throw (err)
        console.log('entry saved')
        console.log(util.inspect(process.memoryUsage()))
      })

      lastDate = new Date()
    }

    last = stdout
  })

  xwininfo.on('exit', function () {
    console.log('calling back!')
    callback()
  })
}