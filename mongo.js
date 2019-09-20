const mongoose = require('mongoose') // mongodb数据库

mongoose.connect('mongodb://localhost/jormungand', {useNewUrlParser: true, useUnifiedTopology: true })
// const db = mongoose.connection
// db.on('error', err => { console.error('error: ', err) })
// db.on('open', () => {
//   const Model = mongoose.model('Model', {
//     age: Number,
//     sex: String,
//     name: String,
//     isTeacher: Boolean,
//     friendsList: [String]
//   })

  

  // const ModelData = {
  //   age: 12,
  //   sex: 'male',
  //   name: 'buleak',
  //   isTeacher: false,
  //   friendsList: ['张三', '李四', '王五']
  // }
  // new Model(ModelData).save()
  // Model.find((err, data) => {
  //   if(err) { throw new Error(err) }
  //   const findData = data
  // })

// })

module.exports = mongoose