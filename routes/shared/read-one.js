var debug = require('debug')('api:routes:shared:read')
var cwd = process.cwd()
var db = require(cwd + '/dbm')

module.exports = (collection, query) => {
  debug('one')

  return new Promise((resolve, reject) => {
    db.get(collection).find(query)
    .next((err, doc) => {
      if (err) {
        reject(err)
      } else {
        resolve(doc)
      }
    })
  })
}
