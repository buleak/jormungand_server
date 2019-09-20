const Koa = require('koa2')
const path = require('path')
const fs = require('fs')
const cors = require('koa2-cors') // 跨域
const json = require('koa-json') // JSON
const logger = require('koa-logger') // 日志
const Router = require('koa-router') // 路由
const onerror = require('koa-onerror') 
const session = require('koa-session') // session
// const mongoose = require('mongoose') // mongodb数据库
const bodyParser = require('koa-bodyparser') // 获取 POST提交数据

const app = new Koa()

const index = require('./routes/index')
const register = require('./routes/register')

onerror(app)

// 配置 session中间件
app.keys = ['some secret hurr'] // cookie的签名
const CONFIG = {
    key: 'koa:sess',
    maxAge: 60*60*24*10, // cookie过期毫秒数
    overwrite: true, // 覆盖形同 key的值
    httpOnly: true, // 只有服务端能访问
    signed: true, // 签名
    rolling: false, // 每次访问都更新 session，会重置 cookie过期时间
    renew: true, // 访问时快过期则更新 session，会重置 cookie过期时间
}
app.use(json()) 
app.use(cors())
app.use(bodyParser())
app.use(session(CONFIG, app))
app.use(logger((str, args) => { console.warn(str, args) }))

console.log('_______________++++++_______________ (( - START - )) _______________++++++_______________')

app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// mongoose.connect('mongodb://localhost/jormungand', {useNewUrlParser: true, useUnifiedTopology: true })
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

  

//   const ModelData = {
//     age: 12,
//     sex: 'male',
//     name: 'buleak',
//     isTeacher: false,
//     friendsList: ['张三', '李四', '王五']
//   }
//   new Model(ModelData).save()
//   Model.find((err, data) => {
//     if(err) { throw new Error(err) }
//     const findData = data
//   })
// })

app.use(index.routes()).use(index.allowedMethods())
app.use(register.routes()).use(register.allowedMethods())

app.listen(3000, console.log('node of koa2 is listening at port 3000'))

module.exports = app