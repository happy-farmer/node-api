var debug = require('debug')('api:server')
var dbm = require('./dbm')

var DBURL = process.env.DBURL
var PORT = process.env.PORT || 3000
var IP = process.env.IP || '0.0.0.0'
var app = require('./app')

module.exports = dbm.connect(DBURL)
.then(
  (db) => {
    debug('starting server...')
    var server = app.listen(PORT, IP, () => debug(`server runs on ${IP}:${PORT}`))
    server.on('close', () => dbm.close())
    if (!process.env.DEBUG) {
      var shutdown = () => {
        debug('stopping server...')
        server.close()
      }
      process.on('SIGINT', shutdown)
      process.on('SIGTERM', shutdown)
    }
    return server
  },
  (err) => {
    throw new Error(err)
  }
)
