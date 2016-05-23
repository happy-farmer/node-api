/**
 * @module routes/shared/update-one
 * @description Apply PATCH method on database,
 *  checking if value is null,
 *  if so removing the data propery
 */

var flat = require('flat')
var _ = require('lodash')
var debug = require('debug')('api:routes:shared:update')
var cwd = process.cwd()
var db = require(cwd + '/dbm')

module.exports = (collection, data, query) => {
  debug('one')

  var flatData = flat(data)
  var modifiers = {
    $set: {},
    $unset: {}
  }
  _.each(flatData, (val, key) => {
    var method = '$set'
    // null will explisitly set property for unset
    if (_.isNull(val)) {
      // removes property from the dataset
      method = '$unset'
    }

    modifiers[`${method}`][key] = val
  })

  var update = _.omitBy(modifiers, (val) => {
    return _.isEmpty(val)
  })
  return db.get(collection).updateOne(query, update)
}
