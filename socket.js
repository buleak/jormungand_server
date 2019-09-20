const app = require('./app')
const io = require('socket.io')(app)
const fs = require('fs')

io.on('connection', socket => {
  console.log('初始化成功')
  io.on('send', data => { 
    // 客户端传来的数据
    console.log('Client: ', data)
    // 发送数据到客户端
    socket.emit('getMsg', `Server return: ${data}`)
  })

  setTimeout(() => {
    socket.emit('getMsg', `last of 3 second, Server return: ${data}`)
  }, 3000);
})