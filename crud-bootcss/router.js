const fs = require('fs')
const express = require('express')

const router = express.Router()

//渲染首页
router.get('/customers', function (req, res) {
  fs.readFile('./assets/db.json', 'utf8', function (err, data) {
    if (err) {
      res.status(500).send('服务器错误！')
      return
    }
    let customers = JSON.parse(data).customers
    res.render('index.html', {
      //
      customers: customers,
    })
  })
})
//渲染添加客户
router.get('/customers/new', function (req, res) {
  //
  res.render('new.html')
})
//处理添加客户
router.post('/customers/new', function (req, res) {
  //
  console.log(req.body)
})
//渲染编辑页面
router.get('/customers/edit', function (req, res) {
  //
})
//处理编辑请求
router.post('/customers/edit', function (req, res) {
  //
})
//处理删除请求
router.get('/customers/delete', function (req, res) {
  //
})

module.exports = router
