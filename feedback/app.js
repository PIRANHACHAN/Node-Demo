const http = require('http')
const fs = require('fs')

http
  .createServer(function (req, res) {
    let url = req.url
    if (url === '/') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          res.end('404 No Found')
          return
        }
        res.end(data)
      })
    }
    if (url.indexOf('/public/') === 0) {
      fs.readFile('.' + url, function (err, data) {
        if (err) {
          res.end('404 Not Found')
          return
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function () {
    console.log('running……')
  })
