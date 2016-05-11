var validate = require('./index')
var proceed = require('./proceed')
var errorHandler = require(process.cwd() + '/error-handler').validationRequest

module.exports = (req, res, next) => {
  var valStatus = validate.request(req.body, res.locals.schemaPath)

  proceed(req, res, next, {
    errorHandler,
    valStatus,
    type: 'request'
  })
}
