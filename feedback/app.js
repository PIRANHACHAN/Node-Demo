const http = require('http')
const fs = require('fs')

http
  .createServer(function (req, res) {
    if (req.url === '/') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          res.end('404 No Found')
          return
        }
        res.end(data)
      })
    }
  })
  .listen(3000, function () {
    console.log('running……')
  })
