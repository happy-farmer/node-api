var debug = require('debug')('api:validator:preset')

var express = require('express')
var router = express.Router()
var ObjectId = require('mongodb').ObjectId
var error = require(process.cwd() + '/error-handler')

var buildSchemaPath = (res, reqPath) => {
  if (!res.locals.schemaPath) {
    var method = res.req.method.toLowerCase()
    var fullPath = (reqPath || res.req.url) + '/' + method
    res.locals.schemaPath = fullPath
  }
}

router.all('/*/list', (req, res, next) => {
  buildSchemaPath(res)
  next()
})

router.all('/*/:id', (req, res, next) => {
  var id = req.params.id
  if (id.length === 24) {
    var reqPath = '/' + req.params[0] + '/\:id'
    buildSchemaPath(res, reqPath)
    // validation for id being truly object id string representation
    try {
      ObjectId(id)
      next()
    } catch (e) {
      error.wrongObjectId(e, req, res, next)
    }
  } else {
    next()
  }
})

router.all('/*', (req, res, next) => {
  buildSchemaPath(res)
  debug(`schema path: ..${res.locals.schemaPath}`)
  next()
})

module.exports = router
