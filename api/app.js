import express from 'express'
import path from 'path'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const moduleURL = new URL(import.meta.url)
const __dirname = path.dirname(moduleURL.pathname)

let clients = []
let value = 0

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/api/data', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-transform') // no-cache does not work with CRA http-proxy-middleware
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  const id = Date.now()
  console.log('Add client', id)
  clients = [...clients, { id: id, res: res }]

  sendData()

  req.on('close', () => {
    console.log('Remove client', id)
    clients = clients.filter(c => c.id !== id)
  })
})

app.post('/api/data', ((req, res) => {
  value = req.body.value
  res.sendStatus(201)

  sendData()
}))

const sendData = () => {
    const data = {
      value: value,
      updatedAt: new Date().toLocaleTimeString()
    }

    console.log(`Sending ${data.value} to ${clients.length} clients`)
    clients.forEach(client => client.res.write(`data: ${JSON.stringify(data)}\n\n`))
}

app.listen(3001, () => console.log('app at http://localhost:3001'))
