var debug = require('debug')('api:error-handler')

module.exports = {
  validationRequest (err, req, res, next) {
    err.technicalMessage = err.error.message
    debug('validation request error occured')
    if (err.valid !== null) {
      err.statusMessage = 'Not valid request'
      err.status = 400
    } else {
      err.statusMessage = 'Not found validation schema'
      err.status = 501
    }
    next(err, req, res, next)
  },
  wrongObjectId (err, req, res, next) {
    err.statusMessage = 'Wrong id format'
    err.technicalMessage = err.text
    err.status = 400
    debug('preset error occured')
    next(err, req, res, next)
  },
  validationResponse (err, req, res, next) {
    err.statusMessage = 'Not valid response'
    err.technicalMessage = err.error.message
    err.status = 501
    debug('validation response error occured')
    next(err, req, res, next)
  },
  dbmWrite (err, req, res, next) {
    err.statusMessage = 'Database write error'
    err.technicalMessage = err.errmsg
    debug('database write error occured')
    next(err, req, res, next)
  },
  dbmRead (err, req, res, next) {
    err.statusMessage = 'Database read error'
    err.technicalMessage = err.errmsg
    debug('database read error occured')
    next(err, req, res, next)
  },
  notFound (err, req, res, next) {
    err.statusMessage = 'Not found'
    err.technicalMessage = err.message || err.errmsg
    err.status = 404
    debug('404 error occured')
    next(err, req, res, next)
  },
  // 501 is new 404
  catchAll404 (req, res, next) {
    var statusMessage = 'Not implemented'
    var status = 501
    var technicalMessage = 'Catch 404 all stage'

    debug('catch all 404 to 501 error occured')

    var err = {
      statusMessage,
      status,
      technicalMessage
    }
    next(err, req, res, next)
  },
  catchAll (err, req, res, next) {
    var statusMessage = err.statusMessage || 'Catch all stage'
    var status = err.status || 500
    var technicalMessage = err.technicalMessage || err.message
    res.status(status)

    res.json({
      status,
      statusMessage,
      technicalMessage
    })
  }
}
