var express = require('express')
var router = express.Router()
var done = require(process.cwd() + '/routes/shared/done')

router.get('/:id', require('./get'), done)
router.patch('/:id', require('./patch'), done)
router.delete('/:id', require('./delete'), done)

module.exports = router
