'use strict'
var readOneFrom = require(process.cwd() + '/routes/shared/read-one')
var ObjectId = require('mongodb').ObjectId

module.exports = readOneFrom('farms', (req) => {
  return {
    _id: ObjectId(req.params.id)
  }
})
