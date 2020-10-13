import io from 'socket.io-client'
import map from '../shared/map.js'
import { Login } from './login.js'
import { Display } from './display.js'
import { Input } from './input.js'

const socket = io()
const display = new Display()
const input = new Input(display)
const login = new Login(socket, () => {
        document.getElementById("game").hidden = false
        socket.on('update', (data) => {
                display.draw_map()
        })
})
