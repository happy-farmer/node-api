var debug = require('debug')('api:routes:shared:insert')
var cwd = process.cwd()
var db = require(cwd + '/dbm')
var errorHandler = require(cwd + '/error-handler').dbmWrite

module.exports = (collection) => {
  return (req, res, next) => {
    debug('one')
    var data = req.body
    data.meta = {
      created: new Date()
    }
    db.get(collection).insertOne(data, (err, dbRes) => {
      if (err) {
        errorHandler(err, req, res, next)
      } else {
        var id = dbRes.insertedId.toJSON()
        res.locals.responseData = {
          id
        }
        res.status(201)
        next()
      }
    })
  }
}
