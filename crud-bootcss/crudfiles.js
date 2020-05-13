/**
 * 封装一个操作文件的模块
 */

const fs = require('fs')

const filePath = './assets/db.json'

//获取所有客户
//return客户列表[]
exports.find = function (callback) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      callback(err)
      return
    }
    callback(null, JSON.parse(data).customers)
  })
}

//添加保存客户
exports.save = function (customer, callback) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      callback(err)
      return
    }
    let customers = JSON.parse(data).customers
    //处理客户id
    customer.id = customers[customers.length - 1].id + 1
    customers.push(customer)
    let fileData = JSON.stringify({
      customers: customers,
    })
    //客户信息写入文件
    fs.writeFile(filePath, fileData, function (err) {
      if (err) {
        callback(err)
        return
      }
      callback(null)
    })
  })
}

//更新客户
exports.update = function () {
  //
}

//删除客户
exports.delete = function () {
  //
}
