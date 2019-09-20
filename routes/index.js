const mongoose = require('../mongo')
const router = require('koa-router')()

const db = mongoose.connection

db.on('error', err => {console.log('error: ', err)})
db.on('open', () => {
  console.log('mongoose is opend')
  // 1. 定义一个 Schema
  const personSchema = new mongoose.Schema({
    name: String,
    age: Number
  })
  
  // 2. 将该 Schema发布为 Model
  const personModel = db.model('person', personSchema)
  // 索引特定的 Model 
  // const personModel = db.model('person')
  
  // 3. 用 Model创建 Entity
  const personEntity = new personModel({
    name: 'buleak',
    age: 22
  })

  // 4. 推送数据到数据库
  personEntity.save()

  // 5. 查询数据
  personModel.find((err, data) => {

  })

  // 6. schema添加方法
  // personSchema.methods.speak = () => {
  //   console.log(`my name is ${this.name}`)
  // }
  // personEntity.speak()
})

router.get('/', async (ctx, next) => {
  ctx.body = 'Hello Koa2'
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
