import { Login } from './login.js'
import { isMob, isDef } from '../server/game.js'
import io from 'socket.io-client'

const socket = io()

let gamedata = {}

let draw = () => {
    c.clearRect(0, 0, canvas.width, canvas.height)
    gamedata.entities.forEach(e => {
        c.fillRect(e.x*s, e.y*s, s, s)
    })
}

let canvas = document.getElementById('maincanvas')
canvas.hidden = true
let c = canvas.getContext('2d')
let s = 5

let login = new Login(socket, (data) => {
    console.log('Sucessful login.')
    socket.on('initialdata', (data) => {
        gamedata.width = data.width
        gamedata.height = data.height
        canvas.width = gamedata.width*s
        canvas.height = gamedata.height*s
        canvas.hidden = false
    })
    socket.on('gamedata', (data) => {
        gamedata.entities = data.entities
        draw()
    })
})