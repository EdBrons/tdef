import { Login } from './login.js'
import io from 'socket.io-client'

const socket = io()

let canvas = document.getElementById('maincanvas')
canvas.hidden = true
let c = canvas.getContext('2d')

let login = new Login(socket, (data) => {
    console.log('Sucessful login.')
})