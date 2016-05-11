var cwd = process.cwd()
var readManyFrom = require(cwd + '/routes/shared/read-many')

module.exports = readManyFrom('markets', (req) => {
  return {
  }
})
