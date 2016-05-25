var test = require('tape')
var request = require('supertest')
var app = require(process.cwd() + '/server')
var validate = require(process.cwd() + '/validator')
var _ = require('lodash')

app.then((server) => {
  test('GET /markets', (t) => {
    t.plan(3)

    request(server)
      .get('/markets')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        var body = res.body
        t.error(err, 'no errors expected')

        var msg = validate.response(body, '/markets/get')
        t.ok(msg.valid, 'has to be valid against schema')

        t.ok(Array.isArray(body), 'has to be collection')

        t.end()
      })
  })

  test('POST /markets (valid request)', (t) => {
    t.plan(2)

    var item = {
      'name': 'name',
      'location': {
        'street-address': 'SOME str 123',
        'city': 'San Francisco',
        'state': 'CA'
      }
    }

    request(server)
      .post('/markets')
      .send(item)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        var body = res.body
        var id = body.id
        t.error(err, 'no errors expected')

        var msg = validate.response(body, '/markets/post')
        t.ok(msg.valid, 'has to be valid against schema')

        test(`GET /markets/${id}`, (t) => {
          t.plan(2)

          request(server)
            .get(`/markets/${id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              var body = res.body
              t.error(err, 'no errors expected')

              var msg = validate.response(body, '/markets/:id/get')
              t.ok(msg.valid, 'has to be valid against schema')
            })
        })

        t.end()
      })
  })

  test('GET /markets/400notvalid400notvalid40', (t) => {
    t.plan(4)

    request(server)
      .get('/markets/400notvalid400notvalid40')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        var body = res.body
        t.error(err, 'no errors expected')

        t.equal(body.status, 400, 'should have status')
        t.ok(_.has(body, 'statusMessage'), 'should have status message')
        t.ok(_.has(body, 'technicalMessage'), 'should have technical message')
        t.end()
      })
  })

  test('GET /markets/404abcdef404abcdef404abc', (t) => {
    t.plan(3)

    request(server)
      .get('/markets/404abcdef404abcdef404abc')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        var body = res.body
        t.error(err, 'no errors expected')

        t.equal(body.status, 404, 'should have status')
        t.ok(_.has(body, 'statusMessage'), 'should have status message')
        t.end()
      })
  })

  test('GET /markets/does_not_exist', (t) => {
    t.plan(4)

    request(server)
      .get('/markets/does_not_exist')
      .expect('Content-Type', /json/)
      .expect(501)
      .end((err, res) => {
        var body = res.body
        t.error(err, 'no errors expected')

        t.equal(body.status, 501, 'should have status')
        t.ok(_.has(body, 'statusMessage'), 'should have status message')
        t.ok(_.has(body, 'technicalMessage'), 'should have technical message')
        t.end()
      })
  })

  test('POST /markets (invalid request)', (t) => {
    t.plan(4)

    request(server)
      .post('/markets')
      .send({})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        var body = res.body
        t.error(err, 'no errors expected')

        t.equal(body.status, 400, 'should have status')
        t.ok(_.has(body, 'statusMessage'), 'should have status message')
        t.ok(_.has(body, 'technicalMessage'), 'should have technical message')
        t.end()
      })
  })
  test.onFinish(() => {
    server.close()
  })
})
