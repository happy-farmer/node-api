var cwd = process.cwd()
var readOneFrom = require(cwd + '/routes/shared/read-one')
var ObjectId = require('mongodb').ObjectId

module.exports = readOneFrom('markets', (req) => {
  return {
    _id: ObjectId(req.params.id)
  }
})
