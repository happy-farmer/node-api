var debug = require('debug')('happyfarmerapi:error-handler')

module.exports = {
  validationRequest: (err, req, res, next) => {
    err.technicalMessage = err.error.message
    if (err.valid !== null) {
      err.statusMessage = 'not valid request'
      err.status = 422
    } else {
      err.statusMessage = 'not found validation'
      err.status = 404
    }
    next(err, req, res, next)
  },
  validationResponse: (err, req, res, next) => {
    err.statusMessage = 'not valid response'
    err.technicalMessage = err.error.message
    err.status = 501
    next(err, req, res, next)
  },
  dbmWrite: (err, req, res, next) => {
    err.statusMessage = 'database write error'
    err.technicalMessage = err.errmsg
    next(err, req, res, next)
  },
  dbmRead: (err, req, res, next) => {
    err.statusMessage = 'database read error'
    err.technicalMessage = err.errmsg
    next(err, req, res, next)
  },
  notFound: (err, req, res, next) => {
    err.statusMessage = 'not found'
    err.technicalMessage = err.message || err.errmsg
    err.status = 404
    next(err, req, res, next)
  },
  catchAll: (err, req, res, next) => {
    var statusMessage = err.statusMessage || 'catch all stage'
    var status = err.status || 500
    var technicalMessage = err.technicalMessage || err.message
    res.status(status)

    debug('error occured')

    res.json({
      status,
      statusMessage,
      technicalMessage
    })
  }
}
