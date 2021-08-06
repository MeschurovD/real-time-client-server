const express = require('express')
const cors = require('cors')
const events = require('events')

const PORT = 5000

const emitter = new events.EventEmitter()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/connect', (req, res) => {
  console.log('get')
  res.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache'
  })
  emitter.on('newMessage', (message) => {
    console.log('on newmessage')
    res.write(`data: ${JSON.stringify(message)} \n\n`)
  })
})

/**
 * Получение нового сообщения
 */
app.post('/new-messages', ((req, res) => {
  const message = req.body
  console.log(message)
  emitter.emit('newMessage', message)
  res.status(200).json({text: "text1"})
}))

app.listen(PORT, () => console.log(`server started on port ${PORT}`))