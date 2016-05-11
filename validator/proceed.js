/**
 * Pipleline after request or response
 *
 */
var debug = require('debug')('happyfarmerapi:validator:proceed')

module.exports = (req, res, next, rest) => {
  var uri = rest.type + ' ' + req.method + ' ' + req.url
  if (!rest.valStatus.valid) {
    debug(`${uri} ERROR`)
    rest.errorHandler(rest.valStatus, req, res, next)
  } else {
    debug(`${uri} OK`)
    next()
  }
}
