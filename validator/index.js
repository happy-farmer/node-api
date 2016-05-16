var path = require('path')
var validator = require('json-api-validator')({
  base: './schemas',
  formats: require('./formats/all'),
  globPattern: '/*/**'
})

var main = (json, schemaPath) => {
  var result = validator(json, path.resolve(schemaPath + '.json'))
  if (result.errors.length) result.error = result.errors[0]
  return result
}

module.exports = {
  request: (json, schemaPath) => main(json, '/request' + schemaPath),
  response: (json, schemaPath) => main(json, '/response' + schemaPath)
}
