var debug = require('debug')('happyfarmerapi:app')

var app = require('express')()
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

debug('loading...')
// Figuring out schema path for validation
app.use(require('./validator/preset'))

// Validating request
app.use(require('./validator/request'))
debug('request validator OK')

// Perfoming route actions
app.use(require('./routes'))
debug('routes OK')

// Catching up whatever
app.use(
  require('./error-handler').catchAll
)

debug('loaded')

module.exports = app
