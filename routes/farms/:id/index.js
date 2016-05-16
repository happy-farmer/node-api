var express = require('express')
var router = express.Router()
var done = require(process.cwd() + '/routes/shared/done')

router.get('/:id', require('./get'), done)
router.patch('/:id', require('./patch'), done)

module.exports = router
