var MongoClient = require('mongodb').MongoClient
var debug = require('debug')('happyfarmerapi:dbm')

var state = {
  db: null
}

module.exports = {
  connect: (url) => new Promise(function (resolve, reject) {
    if (state.db) {
      resolve(state.db)
    } else {
      debug('connecting to database...')
      MongoClient.connect(url, (err, db) => {
        if (err) {
          reject(err)
        } else {
          debug('connected to database')
          state.db = db
          resolve(db)
        }
      })
    }
  }),
  close: () => {
    debug('closing database connection...')
    state.db.close()
    state.db = null
  },
  get: (col) => state.db.collection(col)
}
