var cwd = process.cwd()
var readManyFrom = require(cwd + '/routes/shared/read-many')
var errorDbmRead = require(cwd + '/error-handler').dbmRead
var _ = require('lodash')

module.exports = (req, res, next) => {
  var transformer = (doc) => {
    doc.id = doc._id.toString()
    return _.omit(doc, ['_id'])
  }

  readManyFrom('markets', {}, transformer)
  .then((data) => {
    res.locals.responseData = data
    next()
  })
  .catch((err) => errorDbmRead(err, req, res, next))
}
