import io from 'socket.io-client'
import map_data from '../shared/map.js'

const socket = io()

let map_image = new Image()
map_image.src = 'map.png'
let map_canvas = document.getElementById('map-canvas')
let map_ctx = map_canvas.getContext('2d')
let main_canvas = document.getElementById('main-canvas')
let c = main_canvas.getContext('2d')

let s = 15
let map_offset = {
    x: 30,
    y: 40
}

let resize_canvas = () => {
    main_canvas.width = window.innerWidth
    main_canvas.height = window.innerHeight
}

let draw = () => {
    // adjust the map canvas size in css
    map_canvas.style.width = map_data.width * s + 'px'
    map_canvas.style.height = map_data.height * s + 'px'
    map_ctx.drawImage(
        map_image,
        -map_offset.x, -map_offset.y
    )
}

window.onresize = resize_canvas

map_image.onload = () => {
    resize_canvas()
    draw()
}