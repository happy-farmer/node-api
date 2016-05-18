var cwd = process.cwd()
var insertManyInto = require(cwd + '/routes/shared/insert-many')
var errorHandler = require(cwd + '/error-handler').dbmWrite

module.exports = (req, res, next) => {
  var data = req.body
  data.meta = {
    created: new Date()
  }

  insertManyInto('farms', data)
  .then((doc) => {
    var ids = doc.insertedIds.map((el) => el.toJSON())
    res.locals.responseData = ids
    res.status(201)
    next()
  })
  .catch((err) => errorHandler(err, req, res, next))
}

