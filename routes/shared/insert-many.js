var debug = require('debug')('happyfarmerapi:routes:shared:insert')
var cwd = process.cwd()
var db = require(cwd + '/dbm')
var errorHandler = require(cwd + '/error-handler').dbmWrite

module.exports = (collection) => {
  return (req, res, next) => {
    debug('many')
    var data = req.body
    data.meta = {
      created: new Date()
    }
    db.get(collection).insertMany(data, (err, dbRes) => {
      if (err) {
        errorHandler(err, req, res, next)
      } else {
        var ids = dbRes.insertedIds.map((el) => el.toJSON())
        res.locals.responseData = ids
        res.status(201)
        next()
      }
    })
  }
}
