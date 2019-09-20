const mongoose = require('../mongo')
const router = require('koa-router')()
const EventEmitter = require('events').EventEmitter

const db = mongoose.connection
const event = new EventEmitter()

router.prefix('/register')
db.on('error', err => {console.log('error: ', err)})
db.on('open', () => {
  const Model = mongoose.model('Model', {
    userName: String,
    passWord: String,
    region: String
  }) 

  // mongo查询为异步操作，封装为 Promise
  const mongoFind = (query) => {
    return new Promise((res, rej) => {
      Model.findOne(query).then(data => {
        res(data)
      }).catch(err => {
        throw new Error('Error: ', err)
      })
    })
  }
  router.get('/', async (ctx, next) => {
    console.log(ctx.query)
    // await 等待 mongo查询完毕再进行赋值，否则 msg为空
    let msg = '', findData = '', formType = ctx.query.formType;
    delete ctx.query.formType
    switch (formType) {
      case 'register':
        findData = await mongoFind({'userName': ctx.query.userName})
        if(!findData) {
          new Model(ctx.query).save()
          msg = 'OK' 
        }else {
          msg = '该用户名已存在'
        }
        break;
      case 'login':
        findData = await mongoFind({'userName': ctx.query.userName, 'passWord': ctx.query.passWord})
        msg = findData ? 'OK' : '密码错误' 
        break;
      default:
        msg = '(<·> _ <·>)!!'
        break;
    }

    ctx.body = JSON.parse(JSON.stringify({...ctx.query, msg}))
  })
  
  router.get('/bar', async (ctx, next) => {
    ctx.body = 'this is a users/bar response'
  })
})


module.exports = router
