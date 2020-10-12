import io from 'socket.io-client'
import { draw_map } from './draw'
import map from '../shared/map.js'

const socket = io()
let canvas = document.getElementById('canvas')
let c = canvas.getContext('2d')
let data = {}

let resize_canvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
}

let default_draw = () => {
    resize_canvas()
    draw_map(c)
}

window.onresize = () => default_draw()

socket.on('update', (d) => {
	default_draw()
})

document.getElementById("dologin").onclick = () => {
    socket.emit("login", {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    })
    socket.on("login", (data) => {
        if (data.success) {
            console.log("login success")
            document.getElementById("login").hidden = true
            document.getElementById("game").hidden = false
        }
        else {
            console.log("failed login")
        }
    })
}
