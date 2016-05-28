var test = require('tape')
var request = require('supertest')
var app = require(process.cwd() + '/server')

app.then((server) => {
  test('GET /farms (post spec)', (t) => {
    t.plan(1)

    request(server)
      .get('/farms')
      .end((err, res) => {
        var body = res.body
        t.error(err, 'no errors expected')

        var originalLenght = body.length

        test('POST /farms (post spec)', (t) => {
          t.plan(0)

          var item = {
            'name': 'name Y',
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
            .end(() => {
              test('GET /farms (post spec)', (t) => {
                t.plan(2)

                request(server)
                  .get('/farms/')
                  .end((err, res) => {
                    var body = res.body
                    t.error(err, 'no errors expected')
                    var expectedLength = originalLenght + 1
                    t.equal(expectedLength, body.length, 'has to increase collection')
                  })
              })

              t.end()
            })
        })

        t.end()
      })
  })

  test.onFinish(() => {
    server.close()
  })
})
