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

import map from '../shared/map.js'

function get_terrain(x, y) {
    return map.terrain[y][x]
}

const terrain = {
    OCEAN: 0,
    BEACH: 1,
    PLAINS: 2,
    FOREST: 3,
    HIGHLAND: 4    
}

console.log(get_terrain(0, 0))

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

io.on('connection', (socket) => {
    
})