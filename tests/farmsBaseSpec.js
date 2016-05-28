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
        t.error(err, 'no errors expected')

        var msg = validate.response(body, '/farms/get')
        t.ok(msg.valid, 'has to be valid against schema')

        t.ok(Array.isArray(body), 'has to be collection')

        t.end()
      })
  })

  test('POST /farms (valid request)', (t) => {
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
      .post('/farms')
      .send(item)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        var body = res.body
        var id = body.id
        t.error(err, 'no errors expected')

        var msg = validate.response(body, '/farms/post')
        t.ok(msg.valid, 'has to be valid against schema')

        test(`GET /farms/${id}`, (t) => {
          t.plan(2)

          request(server)
            .get(`/farms/${id}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
              var body = res.body
              t.error(err, 'no errors expected')

              var msg = validate.response(body, '/farms/:id/get')
              t.ok(msg.valid, 'has to be valid against schema')
            })
        })

        test(`DELETE /farms/${id}`, (t) => {
          t.plan(2)

          request(server)
            .delete(`/farms/${id}`)
            .expect('Content-Type', /json/)
            .expect(202)
            .end((err, res) => {
              var body = res.body
              t.error(err, 'no errors expected')

              var msg = validate.response(body, '/farms/:id/delete')
              t.ok(msg.valid, 'has to be valid against schema')
            })
        })

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
        t.error(err, 'no errors expected')

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
        t.error(err, 'no errors expected')

        t.equal(body.status, 404, 'should have status')
        t.ok(_.has(body, 'statusMessage'), 'should have status message')
        t.end()
      })
  })

  test('GET /farms/does_not_exist', (t) => {
    t.plan(4)

    request(server)
      .get('/farms/does_not_exist')
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

  test('POST /farms (invalid request)', (t) => {
    t.plan(4)

    request(server)
      .post('/farms')
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
