import io from 'socket.io-client'
import { init, get_mouse_data } from './input'
import { draw_map, draw_units } from './draw'
import map from '../shared/map'

//init()

const socket = io()
let canvas = document.getElementById('canvas')
let c = canvas.getContext('2d')
let s = 16
let game_data = {}

let resize_canvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

let default_draw = () => {
    draw_map(c, 0, 0, window.innerWidth, window.innerHeight, s)
    draw_units(c, 0, 0, window.innerWidth, window.innerHeight, s, game_data.units)
}

window.onresize = () => {
    resize_canvas()
    default_draw(16)
}

canvas.onclick = (e) => {
    let cx = e.clientX
    let cy = e.clientY
    let gx = Math.floor(cx / s)
    let gy = Math.floor(cy / s)
    //console.log(gx, gy)
}

socket.on('update', (data) => {
    game_data = data
    default_draw()
})

resize_canvas()
default_draw()