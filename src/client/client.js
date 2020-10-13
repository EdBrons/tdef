import io from 'socket.io-client'
import map from '../shared/map.js'
import { Login } from './login.js'
import { Display } from './display.js'

const socket = io()
const display = new Display()
const login = new Login(socket, () => {
        document.getElementById("game").hidden = false
        socket.on('update', (data) => {
                display.draw_map()
        })
})
