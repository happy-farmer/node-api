/**
 * @module routes/shared/update-one
 * @description Updates item
 */

var debug = require('debug')('api:routes:shared:update')
var cwd = process.cwd()
var db = require(cwd + '/dbm')

module.exports = (collection, query, update) => {
  debug('one')
  return db.get(collection).updateOne(query, update)
}
