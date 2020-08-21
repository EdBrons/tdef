import io from 'socket.io-client'

const socket = io()

let canvas = document.getElementById('maincanvas')
let c = canvas.getContext('2d')
let map_image = new Image()

let draw = () => {
    c.drawImage(map_image, 0, 0, window.innerWidth, window.innerHeight)
}

let resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    draw()
}

window.onresize = () => resize()
resize()

map_image.src = "map.png"

map_image.onload = () => {
    draw()
}