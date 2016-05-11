// Schedule hours
// + allow hours which are not overlaping
// + per certain day.

module.exports = function (data, schema) {
  if (Array.isArray(data)) {
    return null
  }
  return 'Schedule hours have wrong format.'
}
