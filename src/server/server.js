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

import { Game } from '../shared/game.js'

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

const game = new Game()

io.on('connection', (socket) => {
    game.add_player(socket)
})

let loop_interval = 1000 / 10
let loop_helper = () => {
    game.update()
    setTimeout(loop_helper, loop_interval)
}

loop_helper()