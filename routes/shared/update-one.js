var debug = require('debug')('api:routes:shared:update')
var cwd = process.cwd()
var db = require(cwd + '/dbm')
var errorHandler = require(cwd + '/error-handler').dbmWrite
var _ = require('lodash')

module.exports = (collection, queryBuilder) => {
  return (req, res, next) => {
    debug('one')
    var data = _.omit(req.body, ['id'])
    data.meta = {
      updated: new Date()
    }
    var filter = queryBuilder(req)
    db.get(collection).updateOne(
      filter,
      data,
      (err, dbRes) => {
        if (err) {
          errorHandler(err, req, res, next)
        } else {
          var id = req.body.id
          res.locals.responseData = {
            id
          }
          res.status(202)
          next()
        }
      }
    )
  }
}
