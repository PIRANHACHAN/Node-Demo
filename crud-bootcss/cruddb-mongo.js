const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const Schema = mongoose.Schema
const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    enum: [0, 1],
    required: true,
  },
  phoneNum: {
    type: Number,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
})

//const Customer = mongoose.model('Customer', customerSchema)

module.exports = mongoose.model('Customer', customerSchema)
