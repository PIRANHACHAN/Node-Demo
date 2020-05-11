const http = require('http')
const fs = require('fs')
const template = require('art-template')
const url = require('url')

//定义数组，存储留言数据
//后续实现数据持久化
const userComments = [
  {
    name: '张三',
    message: '法外狂徒张三',
    dateTime: '2020-04-23',
  },
]

http
  .createServer(function (req, res) {
    //let userUrl = req.url
    let parseObj = url.parse(req.url, true)
    let pathName = parseObj.pathname
    //首页
    if (pathName === '/' || pathName === '/index') {
      fs.readFile('./views/index.html', function (err, data) {
        if (err) {
          res.end('404 Not Found!')
          return
        }
        let htmlStr = template.render(data.toString(), {
          userComments: userComments,
        })
        res.end(htmlStr)
      })
    }
    //留言页
    if (pathName === '/post') {
      fs.readFile('./views/post.html', function (err, data) {
        if (err) {
          res.end('404 Not Found!')
          return
        }
        res.end(data)
      })
    }
    //资源请求
    if (pathName.indexOf('/public/') === 0) {
      fs.readFile('.' + pathName, function (err, data) {
        if (err) {
          res.end('404 Not Found!')
          return
        }
        res.end(data)
      })
    }
    //留言提交
    if (pathName === '/comment') {
      let userComment = parseObj.query
      userComment.dateTime = '2020-05-10'

      userComments.unshift(userComment)
      //状态码设置为302，临时重定向
      //在响应头中通过Location告知客户端重定向
      res.statusCode = 302
      res.setHeader('Location', '/')
      res.end()
    }
  })
  .listen(3000, function () {
    console.log('running……')
  })
