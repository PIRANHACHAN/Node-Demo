const express = require('express')
const bodyParser = require('body-parser')

const userComments = [
  {
    name: '张三',
    message: '法外狂徒张三',
    dateTime: '2020-04-23',
  },
]

const app = express()
//开放public
app.use('/public', express.static(__dirname + '/public'))
//配置body-parser
//解析application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//解析application/json
app.use(bodyParser.json())
//配置art-template
app.engine('html', require('express-art-template'))
//首页
app.get('/', function (req, res) {
  res.render('index.html', {
    userComments: userComments,
  })
})
//留言页
app.get('/post', function (req, res) {
  res.render('post.html')
})
//评论提交
app.post('/post', function (req, res) {
  let userComment = req.body
  //console.log(userComment)
  userComment.dateTime = '2020-05-12'
  userComments.unshift(userComment)
  res.redirect('/')
})
//监听3000端口
app.listen(3000, function () {
  console.log('Server is running!')
})
