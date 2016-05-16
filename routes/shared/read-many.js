var debug = require('debug')('api:routes:shared:read')
var cwd = process.cwd()
var db = require(cwd + '/dbm')
var _ = require('lodash')

module.exports = (collection, queryConstructor) => {
  return (req, res, next) => {
    debug('many')
    var params = queryConstructor(req)
    var data = []
    db.get(collection).find(params)
      .each((err, doc) => {
        if (err) {
          // do error catch
        } else {
          if (doc) {
            doc.id = doc._id.toJSON()
            data.push(_.omit(doc, ['_id']))
          } else {
            res.locals.responseData = data
            next()
          }
        }
      })
  }
}
