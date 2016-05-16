var debug = require('debug')('api:routes:shared:read')
var cwd = process.cwd()
var db = require(cwd + '/dbm')
var errorDbmRead = require(cwd + '/error-handler').dbmRead
var errorNotFound = require(cwd + '/error-handler').notFound
var _ = require('lodash')

module.exports = (collection, queryConstructor) => {
  return (req, res, next) => {
    debug('one')
    var params = queryConstructor(req)
    db.get(collection).find(params)
      .next((err, doc) => {
        if (err) {
          errorDbmRead(err, req, res, next)
        } else {
          if (!doc) {
            errorNotFound({}, req, res, next)
          } else {
            doc.id = doc._id.toJSON()
            res.locals.responseData = _.omit(doc, ['_id'])
            next()
          }
        }
      })
  }
}
