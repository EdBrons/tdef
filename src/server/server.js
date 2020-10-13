import express from 'express'
import http from 'http'
import path from 'path'
import IO from 'socket.io'
// import { port } from './config.js'

const app = express()
const server = http.createServer(app)
const __dirname = path.resolve()
const io = IO(server)

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/dist'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

server.listen(2000, () => {
    console.log("Server running on port 2000")
})

import { Game } from '../shared/game.js'
import { Login } from './login.js'

const game = new Game()
const login = new Login(game)

io.on('connection', (socket) => {
    login.on_connection(socket)
})

let loop_interval = 1000 / 1

let loop_helper = () => {
    game.update()
    setTimeout(loop_helper, loop_interval)
}

loop_helper()
