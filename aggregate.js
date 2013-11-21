var moment = require('moment')
  , EntrySchema = require('./models/entry-schema')
  , properties = require('./properties')
  , database = require('./lib/database')(properties.database)
  , start = moment().startOf('day')
  , end = moment().endOf('day')

database(function () {
  EntrySchema.find({ start: { $lte: end }, end: { $gte: start }}, function (error, test) {
    test.forEach(function (entry) {
      console.log(entry.title, entry.duration / 1000, 'seconds')
    })
  })
})

function humanize(time){
  time = time / 1000

  if (time > 60) {
    time = time / 60

    if (time > 60) {
      return time + ' hours'
    } else {
      return time + ' minutes'
    }
  } else {
    return time + ' seconds'
  }

  return time
}