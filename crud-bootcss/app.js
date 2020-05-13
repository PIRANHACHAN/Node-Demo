const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()

app.engine('html', require('express-art-template'))

app.use('/public', express.static(__dirname + '/public'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//
app.use(router)

app.listen(3000, function () {
  console.log('Server is running!')
})
