var cwd = process.cwd()
var readManyFrom = require(cwd + '/routes/shared/read-many')

module.exports = readManyFrom('farms', (req) => {
  return {
  }
})
