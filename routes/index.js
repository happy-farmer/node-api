var express = require('express')
var router = express.Router()

router.use(require('./farms'))
router.use(require('./markets'))

module.exports = router
