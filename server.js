var debug = require('debug')('api:server')
var dbm = require('./dbm')

var DBURL = process.env.DBURL
var PORT = process.env.PORT || 3000
var IP = process.env.IP || '0.0.0.0'
var app = require('./app')

dbm.connect(DBURL)
.then(
  (db) => {
    debug('starting server...')
    var server = app.listen(PORT, IP, () => debug(`server runs on ${IP}:${PORT}`))
    if (!process.env.DEBUG) {
      var shutdown = () => {
        dbm.close()
        debug('stopping server...')
        server.close()
      }
      process.on('SIGINT', shutdown)
      process.on('SIGTERM', shutdown)
    }
  }
)
.catch(
  (err) => {
    throw new Error(err)
  }
)

module.exports = app
