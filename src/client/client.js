import io from 'socket.io-client'
import { Login } from './login.js'
import { Display } from './display.js'
import * as PIXI from 'pixi.js'

const socket = io()
const display = new Display()
const login = new Login(socket, () => {
        // socket.on('update', (data) => {
		// 		// something
        // })
})
