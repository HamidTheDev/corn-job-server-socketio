const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const schedule = require('node-schedule')

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const PORT = process.env.PORT || 5000

const sendMessage = (message) => {
  io.emit('message', message)
}

// Schedule a job to run every 5 seconds
schedule.scheduleJob('*/5 * * * * *', () => {
  sendMessage('Hello from the server!')
  console.log('first')
})

io.listen(PORT, () =>
  console.log(`Socket io server is running on port ${PORT}`)
)
