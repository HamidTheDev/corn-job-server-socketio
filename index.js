import express from 'express'
import cors from 'cors'
import { Server as socketIoServer } from 'socket.io'


const app = express()
const port = process.env.PORT || 5000

// middlewares
app.use(cors())
app.use(express.json())

// storing server to variable
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// socket server attach with cors must
const socket = new socketIoServer(server, {
  cors: {
    origin: '*',
  },
})

// emitting message to client
const sendMessage = (message) => {
  socket.emit('message', message)
}

app.get('/', (req, res) => {
  sendMessage('Hello World!')
  res.send('Hello World!')
})


// Schedule a job to run every 5 seconds
// schedule.scheduleJob('*/5 * * * * *', () => {
//   sendMessage('Hello from the server!')
//   console.log('first')
// })
