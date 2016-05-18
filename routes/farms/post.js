var cwd = process.cwd()
var insertOneInto = require(cwd + '/routes/shared/insert-one')
var errorHandler = require(cwd + '/error-handler').dbmWrite

module.exports = (req, res, next) => {
  var data = req.body
  data.meta = {
    created: new Date()
  }
  insertOneInto('farms', data)
  .then((doc) => {
    var id = doc.insertedId.toJSON()
    res.locals.responseData = {
      id
    }
    res.status(201)
    next()
  })
  .catch((err) => errorHandler(err, req, res, next))
}
