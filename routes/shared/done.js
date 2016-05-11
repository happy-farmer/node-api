var validator = require(process.cwd() + '/validator/response')
module.exports = [
  validator,
  (req, res) => res.json(res.locals.responseData)
]
