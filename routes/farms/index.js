var express = require('express')
var router = express.Router()
var done = require(process.cwd() + '/routes/shared/done')
var path = require('path')
var base = '/' + path.parse(__dirname).name

router.post(base, require('./post'), done)
router.get(base, require('./get'), done)
router.use(base, require('./list'))
router.use(base, require('./:id'))

module.exports = router
