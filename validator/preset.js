var debug = require('debug')('happyfarmerapi:validator:preset')

var express = require('express')
var router = express.Router()

var buildSchemaPath = (res, reqPath) => {
  if (!res.locals.schemaPath) {
    var method = res.req.method.toLowerCase()
    var fullPath = (reqPath || res.req.url) + '/' + method + '.json'
    res.locals.schemaPath = fullPath
  }
}

router.all('/*/list', (req, res, next) => {
  buildSchemaPath(res)
  next()
})

router.all('/*/:id', (req, res, next) => {
  var reqa = req.url.split('/')
  console.log(reqa[2])
  if (reqa[2].length === 24) {
    var reqPath = '/' + reqa[1] + '/\:id'
    buildSchemaPath(res, reqPath)
  }
  next()
})

router.all('/*', (req, res, next) => {
  buildSchemaPath(res)
  debug(`schema path: ..${res.locals.schemaPath}`)
  next()
})

module.exports = router
