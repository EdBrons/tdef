import express from 'express'
import http from 'http'
import path from 'path'
import IO from 'socket.io'
import { port } from './config.js'

const app = express()
const server = http.createServer(app)
const __dirname = path.resolve()
const io = IO(server)

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/dist'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

import { mysim } from '../shared/mysim.js'

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

io.on('connection', (socket) => {
    console.log('penis')
})