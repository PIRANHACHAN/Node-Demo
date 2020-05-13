const fs = require('fs')
const express = require('express')

const router = express.Router()

const crudFiles = require('./crudfiles')

//渲染首页
router.get('/customers', function (req, res) {
  crudFiles.find(function (err, customers) {
    if (err) {
      res.status(500).send('服务器错误！')
      return
    }
    res.render('index.html', {
      customers: customers,
    })
  })
})

//渲染添加客户
router.get('/customers/new', function (req, res) {
  res.render('new.html')
})
//处理添加客户
router.post('/customers/new', function (req, res) {
  crudFiles.save(req.body, function (err) {
    if (err) {
      res.status(500).send('服务器错误！')
      return
    }
    res.redirect('/customers')
  })
})

//渲染编辑页面
router.get('/customers/edit', function (req, res) {
  crudFiles.findById(parseInt(req.query.id), function (err, customer) {
    if (err) {
      res.status(500).send('服务器错误！')
      return
    }
    res.render('edit.html', {
      customer: customer,
    })
  })
})

//处理编辑请求
router.post('/customers/edit', function (req, res) {
  crudFiles.updateById(req.body, function (err) {
    if (err) {
      res.status(500).send('服务器错误！')
      return
    }
    res.redirect('/customers')
  })
})

//处理删除请求
router.get('/customers/delete', function (req, res) {
  //
})

module.exports = router
