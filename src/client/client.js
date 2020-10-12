import io from 'socket.io-client'
import { draw_map } from './draw'
import map from '../shared/map.js'

const socket = io()
let canvas = document.getElementById('canvas')
let c = canvas.getContext('2d')
let data = {}

function default_draw() {
    resize_canvas()
    draw_map(c, camera_pos, data)
}

window.onresize = () => default_draw()

socket.on('update', (d) => {
	default_draw()
})
