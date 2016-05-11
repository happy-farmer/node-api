var debug = require('debug')('happyfarmerapi:routes:shared:read')
var cwd = process.cwd()
var db = require(cwd + '/dbm')
var errorDbmRead = require(cwd + '/error-handler').dbmRead
var errorNotFound = require(cwd + '/error-handler').notFound

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
            doc._id = doc._id.toJSON()
            res.locals.responseData = doc
            next()
          }
        }
      })
  }
}
