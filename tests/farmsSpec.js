var test = require('tape')
var request = require('supertest')
// var app = require(process.cwd() + '/server')
var validate = require(process.cwd() + '/validator')

test('GET /farms', (t) => {
  t.plan(3)

  request('http://localhost:3004')
    .get('/farms')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      var body = res.body
      console.log(body)
      var msg = validate.response(body, '/farms/get')

      console.log(msg)

      t.error(err, 'no error expected')
      t.ok(Array.isArray(body), 'body has to be array')
      t.ok(msg.valid, 'has to be valid against schema')
      t.end()
    })
})
