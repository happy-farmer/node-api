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
      'name': 'name Z',
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

  test.onFinish(() => {
    server.close()
  })
})
