var debug = require('debug')('api:routes:shared:insert')
var cwd = process.cwd()
var db = require(cwd + '/dbm')

module.exports = (collection, data) => {
  debug('one')

  return db.get(collection).insertOne(data)
}
