var cwd = process.cwd()
var insertManyInto = require(cwd + '/routes/shared/insert-many')

module.exports = insertManyInto('farms')
