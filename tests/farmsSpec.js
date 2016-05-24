var test = require('tape')
var request = require('supertest')
var app = require(process.cwd() + '/server')
var validate = require(process.cwd() + '/validator')
var _ = require('lodash')

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

  test('GET /farms/400notvalid400notvalid40', (t) => {
    t.plan(4)

    request(server)
      .get('/farms/400notvalid400notvalid40')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        var body = res.body

        t.error(err, 'no error expected')
        t.equal(body.status, 400, 'should have status')
        t.ok(_.has(body, 'statusMessage'), 'should have status message')
        t.ok(_.has(body, 'technicalMessage'), 'should have technical message')
        t.end()
      })
  })

  test('GET /farms/404abcdef404abcdef404abc', (t) => {
    t.plan(3)

    request(server)
      .get('/farms/404abcdef404abcdef404abc')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        var body = res.body

        t.error(err, 'no error expected')
        t.equal(body.status, 404, 'should have status')
        t.ok(_.has(body, 'statusMessage'), 'should have status message')
        t.end()
      })
  })

  test.onFinish(() => {
    server.close()
  })
})
