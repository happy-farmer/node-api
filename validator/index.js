var path = require('path')
var validator = require('json-api-validator')({
  base: './schemas',
  formats: require('./formats/all'),
  globPattern: '/*/**'
})
var debug = require('debug')('api:validator:index')

var main = (json, schemaPath) => {
  var jsonPath = path.resolve(schemaPath + '.json')
  debug(`json path: ${jsonPath}`)
  var result = validator(json, jsonPath)
  if (result.errors.length) result.error = result.errors[0]
  return result
}

module.exports = {
  request: (json, schemaPath) => main(json, '/request' + schemaPath),
  response: (json, schemaPath) => main(json, '/response' + schemaPath)
}
