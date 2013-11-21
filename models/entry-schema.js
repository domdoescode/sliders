var mongoose = require('mongoose')
  , schema =
    { title: String
    , start: Date
    , end: Date
    , duration: Number
    }

module.exports = mongoose.model('Entry', schema)