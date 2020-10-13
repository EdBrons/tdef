import io from 'socket.io-client'
import map from '../shared/map.js'
import { Login } from './login.js'

const socket = io()
let canvas = document.getElementById('canvas')
let c = canvas.getContext('2d')
c.imageSmoothingEnabled = false;
let data = {}

let map_image = new Image()
map_image.src = "map.png"

let default_draw = () => {
    // draw_map(c)
    canvas.style.width = 200 * 10 + "px"
    canvas.style.height = 130 * 10 + "px"
    let r = window.devicePixelRatio 
    let h = window.innerHeight
    let w = window.innerHeight * 200 / 130
    c.drawImage(map_image, 0, 0)
}

window.onresize = () => default_draw()

socket.on('update', (d) => {
	default_draw()
})

let login = new Login(socket, () => {
    document.getElementById("game").hidden = false
})
