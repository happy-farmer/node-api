var debug = require('debug')('api:routes:shared:read')
var cwd = process.cwd()
var db = require(cwd + '/dbm')

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
            doc._id = doc._id.toJSON()
            data.push(doc)
          } else {
            res.locals.responseData = data
            next()
          }
        }
      })
  }
}
