'use strict'
var updateOneFrom = require(process.cwd() + '/routes/shared/update-one')
var ObjectId = require('mongodb').ObjectId

module.exports = updateOneFrom('farms', (req) => {
  return {
    _id: ObjectId(req.params.id)
  }
})
