var cwd = process.cwd()
var insertOneInto = require(cwd + '/routes/shared/insert-one')

module.exports = insertOneInto('markets')
