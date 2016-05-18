'use strict'
var readOneFrom = require(process.cwd() + '/routes/shared/read-one')
var ObjectId = require('mongodb').ObjectId
var cwd = process.cwd()
var errorDbmRead = require(cwd + '/error-handler').dbmRead
var errorNotFound = require(cwd + '/error-handler').notFound
var _ = require('lodash')

module.exports = (req, res, next) => {
  var query = {
    _id: ObjectId(req.params.id)
  }
  readOneFrom('farms', query)
  .then((doc) => {
    if (!doc) {
      errorNotFound({}, req, res, next)
    } else {
      doc.id = doc._id.toJSON()
      res.locals.responseData = _.omit(doc, ['_id'])
      next()
    }
  })
  .catch((err) => {
    errorDbmRead(err, req, res, next)
  })
}

