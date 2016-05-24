var test = require('tape')
var request = require('supertest')
var app = require(process.cwd() + '/server')
var validate = require(process.cwd() + '/validator')

app.then((server) => {
  test('GET /farms', (t) => {
    t.plan(3)

    request(server)
      .get('/farms')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        var body = res.body
        var msg = validate.response(body, '/farms/get')

        t.error(err, 'no error expected')
        t.ok(Array.isArray(body), 'has to be collection')
        t.ok(msg.valid, 'has to be valid against schema')

        t.end()
      })
  })

  test.onFinish(() => {
    server.close()
  })
})
