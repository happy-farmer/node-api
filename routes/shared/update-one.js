var debug = require('debug')('api:routes:shared:update')
var cwd = process.cwd()
var db = require(cwd + '/dbm')

module.exports = (collection, data, query) => {
  debug('one')
  return db.get(collection).updateOne(query, data)
}
