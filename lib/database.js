var mongoose = require('mongoose')
  , db = mongoose.connection

module.exports = function (options) {
  function connect(callback) {
    var connectionString = 'mongodb://'

    if (options.user) {
      connectionString += options.user + ':' + options.password + '@'
    }

    connectionString += options.host + ':' + options.port + '/' + options.name

    console.log(connectionString)
    mongoose.connect(connectionString)

    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', callback)
  }

  return {
    connect: connect
  }
}