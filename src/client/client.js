import io from 'socket.io-client'
import map_data from '../shared/map.js'

const socket = io()

let map_canvas = document.getElementById('map-canvas')
let map_ctx = map_canvas.getContext('2d')
let top_canvas = document.getElementById('canvas')
let top_ctx = canvas.getContext('2d')

let map_image = new Image()
map_image.src = 'map.png'

let s = 30
let offset = {
    x: 40,
    y: 40
}

let resize_canvas = () => {
    top_canvas.width = window.innerWidth
    top_canvas.height = window.innerHeight
}

let draw = () => {
    // adjust the map canvas size in css
    map_canvas.style.width = map_data.width * s + 'px'
    map_canvas.style.height = map_data.height * s + 'px'
    map_ctx.drawImage(
        map_image,
        0, 0
    )
}

window.onresize = resize_canvas

map_image.onload = () => {
    resize_canvas()
    draw()
    for (let x = 0; x < 100; x++) {
        top_ctx.fillRect(x*s, 0, 1, window.innerHeight)
    }
    for (let y = 0; y < 100; y++) {
        top_ctx.fillRect(0, y*s, window.innerWidth, 1)
    }
}