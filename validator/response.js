var validate = require('./index')
var proceed = require('./proceed')
var errorHandler = require(process.cwd() + '/error-handler').validationResponse

module.exports = (req, res, next) => {
  var data = res.locals.responseData
  var valStatus = validate.response(data, res.locals.schemaPath)
  proceed(req, res, next, {
    errorHandler,
    valStatus,
    type: 'response'
  })
}
