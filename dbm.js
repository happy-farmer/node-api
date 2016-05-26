/**
 * @module dbm
 * @description Singletone to manage mongodb connection
 */

var MongoClient = require('mongodb').MongoClient
var debug = require('debug')('api:dbm')

var state = {}

module.exports = {
  connect (url) {
    return new Promise(function (resolve, reject) {
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
    })
  },
  close () {
    debug('closing database connection...')
    state.db.close()
  },
  get (col) {
    return state.db.collection(col)
  }
}
