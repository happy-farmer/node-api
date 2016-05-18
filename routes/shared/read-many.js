var debug = require('debug')('api:routes:shared:read')
var cwd = process.cwd()
var db = require(cwd + '/dbm')

module.exports = (collection, query, transformer) => {
  debug('many')
  var data = []

  return new Promise((resolve, reject) => {
    db.get(collection).find(query)
      .each((err, doc) => {
        if (err) {
          reject(err)
        } else {
          if (doc) {
            data.push(transformer(doc))
          } else {
            resolve(data)
          }
        }
      })
  })
}
