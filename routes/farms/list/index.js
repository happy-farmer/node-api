var express = require('express')
var router = express.Router()
var done = require(process.cwd() + '/routes/shared/done')

router.post('/list', require('./post'), done)
router.get('/list', require('./get'), done)

module.exports = router
