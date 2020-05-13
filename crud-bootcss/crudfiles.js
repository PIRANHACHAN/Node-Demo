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

//根据id获取客户信息
exports.findById = function (id, callback) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      callback(err)
      return
    }

    let customers = JSON.parse(data).customers
    let ret = customers.find(function (item) {
      return item.id === id
    })
    callback(null, ret)
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
    //let foo = customers[customers.length - 1].id + 10
    customer.id = parseInt(customers[customers.length - 1].id + 1)
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

//更新编辑客户
exports.updateById = function (customer, callback) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      callback(err)
      return
    }
    let customers = JSON.parse(data).customers

    customer.id = parseInt(customer.id)

    let ctm = customers.find(function (item) {
      return item.id === customer.id
    })

    for (let key in customer) {
      ctm[key] = customer[key]
    }

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

//删除客户
exports.deleteById = function (id, callback) {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      callback(err)
      return
    }
    let customers = JSON.parse(data).customers
    let deleteId = customers.findIndex(function (item) {
      return item.id === parseInt(id)
    })

    customers.splice(deleteId, 1)

    let fileData = JSON.stringify({
      customers: customers,
    })
    fs.writeFile(filePath, fileData, function (err) {
      if (err) {
        callback(err)
        return
      }
      callback(null)
    })
  })
}
