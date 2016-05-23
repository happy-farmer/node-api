/**
 * @module routes/markets/:id/patch
 * @descriptin Updates item
 */

var updateOneFrom = require(process.cwd() + '/routes/shared/update-one')
var ObjectId = require('mongodb').ObjectId
var cwd = process.cwd()
var dbmWriteError = require(cwd + '/error-handler').dbmWrite
var flat = require('flat')

module.exports = (req, res, next) => {
  var query = {
    _id: ObjectId(req.params.id)
  }
  var data = req.body
  var $set = flat(data)
  $set['meta.updated'] = new Date()
  var update = {
    $set
  }
  updateOneFrom('markets', query, update)
  .then((doc) => {
    var id = req.params.id
    res.locals.responseData = {
      id
    }
    res.status(202)
    next()
  })
  .catch((err) => dbmWriteError(err, req, res, next))
}
